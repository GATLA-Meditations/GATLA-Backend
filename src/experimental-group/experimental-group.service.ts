import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ExperimentalGroupRepository } from './experimental-group.repository';
import { CreateExperimentalGroupDto, UpdateExperimentalGroupDto } from './dto/create-experimental-group.dto';
import { ExperimentalGroupDto, UserParticipationStatusDto, GroupParticipationSummaryDto } from './dto/experimental-group.dto';
import { ExperimentalGroup, User } from '@prisma/client';

// Tipos específicos para incluir relaciones
type ExperimentalGroupWithUsers = ExperimentalGroup & {
  users?: Array<{
    id: string;
    patient_code: string;
    programStartDate: Date | null;
    isInvalidated: boolean;
    invalidationReason: string | null;
  }>;
};

type UserWithRelations = User & {
  questionnaireSubmissions?: any[];
  experimentalGroup?: ExperimentalGroup;
};

@Injectable()
export class ExperimentalGroupService {
  constructor(private repository: ExperimentalGroupRepository) {}

  async createGroup(data: CreateExperimentalGroupDto): Promise<ExperimentalGroupDto> {
    // Validar que las semanas de cuestionarios están dentro del rango de duración
    this.validateWeeks(data.questionnaireWeeks, data.durationWeeks, 'cuestionarios');
    this.validateWeeks(data.meditationWeeks, data.durationWeeks, 'meditación');

    const group = await this.repository.create(data);
    return this.mapToDto(group);
  }

  async getAllGroups(): Promise<ExperimentalGroupDto[]> {
    const groups = await this.repository.findAll();
    return groups.map((group) => this.mapToDto(group, (group as ExperimentalGroupWithUsers).users?.length || 0));
  }

  async getGroupById(id: string): Promise<ExperimentalGroupDto> {
    const group = await this.repository.findById(id);
    if (!group) {
      throw new NotFoundException(`Grupo experimental con ID ${id} no encontrado`);
    }
    return this.mapToDto(group, (group as ExperimentalGroupWithUsers).users?.length || 0);
  }

  async updateGroup(id: string, data: UpdateExperimentalGroupDto): Promise<ExperimentalGroupDto> {
    const existingGroup = await this.repository.findById(id);
    if (!existingGroup) {
      throw new NotFoundException(`Grupo experimental con ID ${id} no encontrado`);
    }

    // Validar semanas si se están actualizando
    if (data.questionnaireWeeks && data.durationWeeks) {
      this.validateWeeks(data.questionnaireWeeks, data.durationWeeks, 'cuestionarios');
    }
    if (data.meditationWeeks && data.durationWeeks) {
      this.validateWeeks(data.meditationWeeks, data.durationWeeks, 'meditación');
    }

    const updatedGroup = await this.repository.update(id, data);
    return this.mapToDto(updatedGroup);
  }

  async deleteGroup(id: string): Promise<void> {
    const group = (await this.repository.findById(id)) as ExperimentalGroupWithUsers;
    if (!group) {
      throw new NotFoundException(`Grupo experimental con ID ${id} no encontrado`);
    }

    if (group.users && group.users.length > 0) {
      throw new BadRequestException('No se puede eliminar un grupo que tiene usuarios asignados');
    }

    await this.repository.delete(id);
  }

  async assignUserToGroup(userId: string, groupId: string): Promise<void> {
    const group = await this.repository.findById(groupId);
    if (!group) {
      throw new NotFoundException(`Grupo experimental con ID ${groupId} no encontrado`);
    }

    await this.repository.assignUserToGroup(userId, groupId);
  }

  async removeUserFromGroup(userId: string, reason?: string): Promise<void> {
    await this.repository.removeUserFromGroup(userId, reason);
  }

  async bulkAssignUsers(userIds: string[], groupId: string): Promise<void> {
    const group = await this.repository.findById(groupId);
    if (!group) {
      throw new NotFoundException(`Grupo experimental con ID ${groupId} no encontrado`);
    }

    await this.repository.bulkAssignUsers(userIds, groupId);
  }

  async getGroupParticipationSummary(groupId: string): Promise<GroupParticipationSummaryDto> {
    const group = await this.repository.findById(groupId);
    if (!group) {
      throw new NotFoundException(`Grupo experimental con ID ${groupId} no encontrado`);
    }

    const users = await this.repository.getUsersInGroup(groupId);
    const participants = users.map((user) => this.getUserParticipationStatus(user, group));

    return {
      group: this.mapToDto(group),
      participants,
      totalParticipants: participants.length,
      activeParticipants: participants.filter((p) => !p.isInvalidated).length,
      invalidatedParticipants: participants.filter((p) => p.isInvalidated).length,
      compliantParticipants: participants.filter((p) => p.isCompliant && !p.isInvalidated).length,
    };
  }

  async startUserProgram(userId: string): Promise<void> {
    await this.repository.startUserProgram(userId);
  }

  async invalidateUser(userId: string, reason: string): Promise<void> {
    await this.repository.invalidateUser(userId, reason);
  }

  /**
   * Calcula en qué semana del programa se encuentra un usuario
   */
  calculateCurrentWeek(programStartDate: Date): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - programStartDate.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  }

  /**
   * Determina si un usuario debe recibir un cuestionario esta semana
   */
  shouldReceiveQuestionnaireThisWeek(user: UserWithRelations, group: ExperimentalGroup): boolean {
    if (!user.programStartDate || user.isInvalidated) {
      return false;
    }

    const currentWeek = this.calculateCurrentWeek(user.programStartDate);
    return group.questionnaireWeeks.includes(currentWeek);
  }

  /**
   * Determina si un usuario tiene ejercicios de meditación habilitados esta semana
   */
  hasMeditationThisWeek(user: UserWithRelations, group: ExperimentalGroup): boolean {
    if (!user.programStartDate || user.isInvalidated) {
      return false;
    }

    const currentWeek = this.calculateCurrentWeek(user.programStartDate);
    return group.meditationWeeks.includes(currentWeek);
  }

  /**
   * Obtiene el estado de participación de un usuario
   */
  getUserParticipationStatus(user: UserWithRelations, group: ExperimentalGroup): UserParticipationStatusDto {
    const currentWeek = user.programStartDate ? this.calculateCurrentWeek(user.programStartDate) : undefined;

    // Calcular cuestionarios completados
    const completedQuestionnaires = user.questionnaireSubmissions?.length || 0;

    // Calcular cuestionarios requeridos hasta la fecha
    const completedWeeks = currentWeek || 0;
    const requiredQuestionnaires = group.questionnaireWeeks.filter((week) => week <= completedWeeks).length;

    // Determinar si está en cumplimiento
    const isCompliant = !user.isInvalidated && completedQuestionnaires >= requiredQuestionnaires;

    // Próximo cuestionario
    const nextQuestionnaireWeek = group.questionnaireWeeks.find((week) => (currentWeek ? week > currentWeek : week === 1));

    return {
      userId: user.id,
      patientCode: user.patient_code,
      programStartDate: user.programStartDate,
      currentWeek,
      isInvalidated: user.isInvalidated,
      invalidationReason: user.invalidationReason,
      completedQuestionnaires,
      totalRequiredQuestionnaires: group.questionnaireWeeks.length,
      isCompliant,
      nextQuestionnaireWeek,
      hasMeditationThisWeek: this.hasMeditationThisWeek(user, group),
    };
  }

  /**
   * Obtiene todos los usuarios que necesitan verificación de cuestionarios pendientes
   */
  async getUsersForQuestionnaireCheck(): Promise<UserWithRelations[]> {
    return this.repository.getUsersWithPendingQuestionnaires() as Promise<UserWithRelations[]>;
  }

  private validateWeeks(weeks: number[], durationWeeks: number, type: string): void {
    if (weeks.some((week) => week < 1 || week > durationWeeks)) {
      throw new BadRequestException(`Las semanas de ${type} deben estar entre 1 y ${durationWeeks}`);
    }
  }

  private mapToDto(group: ExperimentalGroup, userCount?: number): ExperimentalGroupDto {
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      durationWeeks: group.durationWeeks,
      questionnaireWeeks: group.questionnaireWeeks,
      meditationWeeks: group.meditationWeeks,
      createdAt: group.createdAt,
      isActive: group.isActive,
      userCount,
    };
  }
}
