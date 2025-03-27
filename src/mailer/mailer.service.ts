import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMailDto } from './dto/create-mail.dto';
import * as nodemailer from 'nodemailer';
import { formatRequestOwnerNotificationHTML, formatRequestClientNotificationHTML } from './utils/email-formatter.util';

@Injectable()
export class MailerService {

  private transporter: nodemailer.Transporter;
  private emailToNotify: string;
  private emailToUse = {
    email: '',
    name: '',
  };

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow('SMTP_HOST'),
      port: this.configService.getOrThrow('SMTP_PORT'),
      secure: this.configService.getOrThrow('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.getOrThrow('SMTP_USER'),
        pass: this.configService.getOrThrow('SMTP_PASS'),
      },
    });
    this.emailToUse = {
      email: this.configService.getOrThrow('NOTIFICATION_EMAIL'),
      name: this.configService.getOrThrow('NOTIFICATION_EMAIL_NAME'),
    };
    this.emailToNotify = this.configService.getOrThrow('RECEIVE_NOTIFICATION_EMAIL');
  }

  async sendNotificationEmail(createMailDto: CreateMailDto, files?: Array<Express.Multer.File>) {
    const { name: clientName, description, email, phone } = createMailDto;

    try {
      await this.transporter.sendMail({
        from: `"${this.emailToUse.name}" <${this.emailToUse.email}>`,
        to: email,
        subject: `Hemos recibido tu solicitud!`,
        html: formatRequestClientNotificationHTML(),
      });

      await this.transporter.sendMail({
        from: `"${this.emailToUse.name}" <${this.emailToUse.email}>`,
        to: this.emailToNotify,
        subject: `Nueva Peticion de Cotizacion (${clientName})`,
        html: formatRequestOwnerNotificationHTML(clientName, description, phone, email),
        attachments: files ? await this.getAttachments(files) : [],
      });

      return {
        success: true,
        message: `Mail sent successfully`,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async getAttachments(files: Array<Express.Multer.File>) {
    return files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    }));
  }
}
