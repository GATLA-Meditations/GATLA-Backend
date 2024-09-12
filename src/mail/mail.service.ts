import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Cambia a tu proveedor de SMTP
      port: 587, // O el puerto correspondiente a tu servidor SMTP
      secure: false, // true para puerto 465, false para otros puertos
      auth: {
        user: 'renacentia@gmail.com', // Tu correo electrónico
        pass: 'your-email-password',    // Tu contraseña
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: 'Renacentia-org', // Cambia por el remitente
        to,
        subject,
        text,
        html, // Puedes enviar también el cuerpo en HTML si lo necesitas
      });
      console.log('Correo enviado correctamente');
    } catch (error) {
      console.error('Error enviando el correo:', error);
    }
  }
}
