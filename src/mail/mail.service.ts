import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        from: 'Renacentia eugenio@renacentia.org',
        to,
        subject,
        text,
        html,
      });
      console.log('Correo enviado correctamente');
    } catch (error) {
      console.error('Error enviando el correo:', error);
    }
  }

  async sendWelcomeEmail(to: string, subject: string, patientCode: string, password: string): Promise<void> {
    try {
      this.mailerService.sendMail({
        from: 'Renacentia eugenio@renacentia.org',
        to,
        subject,
        template: 'welcome',
        context: {
          patientCode: patientCode,
          password: password,
        },
      });
      console.log('Correo enviado correctamente');
    } catch (error) {
      console.error('Error enviando el correo:', error);
    }
  }
}
