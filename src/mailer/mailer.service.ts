import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateMailDto } from './dto/create-mail.dto';
import { Resend } from 'resend';
import { formatRequestOwnerNotificationHTML, formatRequestClientNotificationHTML } from './utils/email-formatter.util';

@Injectable()
export class MailerService {

  private resend: Resend;
  private emailToNotify: string;
  private emailToUse = {
    email: '',
    name: '',
  };

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.getOrThrow('RESEND_API_KEY'));
    this.emailToUse = {
      email: this.configService.getOrThrow('NOTIFICATION_EMAIL'),
      name: this.configService.getOrThrow('NOTIFICATION_EMAIL_NAME'),
    };
    this.emailToNotify = this.configService.getOrThrow('RECEIVE_NOTIFICATION_EMAIL');

  }

  async sendNotificationEmail(createMailDto: CreateMailDto, files?: Array<Express.Multer.File>) {
    
    const { name: clientName, description, email, phone } = createMailDto;

    const { error: errorClient } = await this.resend.emails.send(
      {
        from: `${this.emailToUse.name} <${this.emailToUse.email}>`,
        to: [email],
        subject: `Hemos recibido tu solicitud!`,
        html: formatRequestClientNotificationHTML(),
      }
    );

    if (errorClient) {
      throw new InternalServerErrorException(errorClient.message);
    }

    const { error: errorOwner } = await this.resend.emails.send(
      {
        from: `${this.emailToUse.name} <${this.emailToUse.email}>`,
        to: [this.emailToNotify],
        subject: `Nueva Peticion de Cotizacion (${clientName})`,
        html: formatRequestOwnerNotificationHTML(clientName, description, phone, email),
        attachments: files ? await this.getAttachments(files) : []
      }
    );

    if (errorOwner) {
      throw new InternalServerErrorException(errorOwner.message);
    }

    return {
      success: true,
      message: `Mail sent successfully`
    };
  }


  private async getAttachments(files: Array<Express.Multer.File>) {
    return await Promise.all(files.map(async (file) => ({
      filename: file.originalname,
      content: Buffer.from(await file.buffer),
      contentType: file.mimetype,
    })));
  }

}
