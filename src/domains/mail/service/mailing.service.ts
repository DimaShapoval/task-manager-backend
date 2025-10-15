import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailingService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(to: string, subject: string, template: string, context: any) {

    await this.mailerService.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to,
      subject,
      template,
      context
    });
  }
}