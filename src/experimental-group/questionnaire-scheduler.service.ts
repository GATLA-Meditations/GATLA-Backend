import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ExperimentalGroupService } from './experimental-group.service';
import { NotificationService } from '../notification/notification.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuestionnaireSchedulerService {
  private readonly logger = new Logger(QuestionnaireSchedulerService.name);

  constructor(
    private experimentalGroupService: ExperimentalGroupService,
    private notificationService: NotificationService,
    private prisma: PrismaService,
  ) {}

  /**
   * Se ejecuta diariamente a las 9:00 AM para verificar cuestionarios pendientes
   */
  @Cron('0 9 * * *')
  async checkPendingQuestionnaires() {
    this.logger.log('Iniciando verificación de cuestionarios pendientes...');

    try {
      const users = await this.experimentalGroupService.getUsersForQuestionnaireCheck();

      for (const user of users) {
        if (!user.experimentalGroup || !user.programStartDate || user.isInvalidated) {
          continue;
        }

        const currentWeek = this.experimentalGroupService.calculateCurrentWeek(user.programStartDate);
        const shouldReceiveQuestionnaire = this.experimentalGroupService.shouldReceiveQuestionnaireThisWeek(user, user.experimentalGroup);

        if (shouldReceiveQuestionnaire) {
          await this.createQuestionnaireSubmissionIfNeeded(user, currentWeek);
        }
      }

      this.logger.log('Verificación de cuestionarios pendientes completada');
    } catch (error) {
      this.logger.error('Error durante la verificación de cuestionarios pendientes:', error);
    }
  }

  /**
   * Se ejecuta diariamente a las 11:00 PM para verificar cuestionarios expirados
   */
  @Cron('0 23 * * *')
  async checkExpiredQuestionnaires() {
    this.logger.log('Iniciando verificación de cuestionarios expirados...');

    try {
      const expiredSubmissions = await this.prisma.questionnaireSubmission.findMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
          answers: {
            none: {},
          },
        },
        include: {
          user: {
            include: {
              experimentalGroup: true,
            },
          },
        },
      });

      for (const submission of expiredSubmissions) {
        if (!submission.user.isInvalidated) {
          await this.experimentalGroupService.invalidateUser(
            submission.user.id,
            `Cuestionario expirado sin responder (vencimiento: ${submission.expiresAt?.toLocaleDateString()})`,
          );

          this.logger.log(`Usuario ${submission.user.patient_code} invalidado por cuestionario expirado`);

          // Enviar notificación al usuario (opcional)
          await this.notificationService.sendPushNotification({
            userId: submission.user.id,
            title: 'Participación Finalizada',
            body: 'Tu participación en el estudio ha sido finalizada por no responder el cuestionario a tiempo.',
          });
        }
      }

      this.logger.log('Verificación de cuestionarios expirados completada');
    } catch (error) {
      this.logger.error('Error durante la verificación de cuestionarios expirados:', error);
    }
  }

  /**
   * Se ejecuta cada lunes a las 10:00 AM para enviar recordatorios de cuestionarios
   */
  @Cron('0 10 * * 1')
  async sendQuestionnaireReminders() {
    this.logger.log('Enviando recordatorios de cuestionarios...');

    try {
      const pendingSubmissions = await this.prisma.questionnaireSubmission.findMany({
        where: {
          expiresAt: {
            gt: new Date(),
          },
          answers: {
            none: {},
          },
        },
        include: {
          user: {
            include: {
              experimentalGroup: true,
            },
          },
          questionnaire: true,
        },
      });

      for (const submission of pendingSubmissions) {
        if (!submission.user.isInvalidated) {
          const daysLeft = Math.ceil((submission.expiresAt!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

          await this.notificationService.sendPushNotification({
            userId: submission.user.id,
            title: 'Recordatorio: Cuestionario Pendiente',
            body: `Tienes ${daysLeft} días para completar tu cuestionario. ¡No olvides responderlo!`,
          });

          this.logger.log(`Recordatorio enviado a ${submission.user.patient_code} (${daysLeft} días restantes)`);
        }
      }

      this.logger.log('Recordatorios de cuestionarios enviados');
    } catch (error) {
      this.logger.error('Error enviando recordatorios de cuestionarios:', error);
    }
  }

  /**
   * Crea una nueva submission de cuestionario si es necesario
   */
  private async createQuestionnaireSubmissionIfNeeded(user: any, currentWeek: number) {
    // Verificar si ya existe una submission para esta semana
    const existingSubmission = await this.prisma.questionnaireSubmission.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gte: this.getWeekStartDate(user.programStartDate, currentWeek),
          lt: this.getWeekEndDate(user.programStartDate, currentWeek),
        },
      },
    });

    if (existingSubmission) {
      return; // Ya existe una submission para esta semana
    }

    // Buscar el cuestionario asociado al tratamiento del usuario
    // Nota: Esto podría necesitar adaptación según tu lógica específica
    const userTreatment = await this.prisma.userTreatment.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        treatment: {
          include: {
            questionnaires: true,
          },
        },
      },
    });

    if (!userTreatment?.treatment.questionnaires.length) {
      this.logger.warn(`Usuario ${user.patient_code} no tiene cuestionarios asociados`);
      return;
    }

    // Tomar el primer cuestionario (o implementar lógica más específica)
    const questionnaire = userTreatment.treatment.questionnaires[0];

    // Crear la submission con fecha de expiración
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expira en 7 días

    await this.prisma.questionnaireSubmission.create({
      data: {
        userId: user.id,
        questionnaireId: questionnaire.id,
        expiresAt,
      },
    });

    // Enviar notificación al usuario
    await this.notificationService.sendPushNotification({
      userId: user.id,
      title: 'Nuevo Cuestionario Disponible',
      body: `Tienes un nuevo cuestionario disponible. Tienes 7 días para completarlo.`,
    });

    this.logger.log(`Cuestionario creado para usuario ${user.patient_code} (semana ${currentWeek})`);
  }

  /**
   * Obtiene la fecha de inicio de una semana específica del programa
   */
  private getWeekStartDate(programStartDate: Date, week: number): Date {
    const startDate = new Date(programStartDate);
    startDate.setDate(startDate.getDate() + (week - 1) * 7);
    startDate.setHours(0, 0, 0, 0);
    return startDate;
  }

  /**
   * Obtiene la fecha de fin de una semana específica del programa
   */
  private getWeekEndDate(programStartDate: Date, week: number): Date {
    const endDate = new Date(programStartDate);
    endDate.setDate(endDate.getDate() + week * 7);
    endDate.setHours(0, 0, 0, 0);
    return endDate;
  }
}
