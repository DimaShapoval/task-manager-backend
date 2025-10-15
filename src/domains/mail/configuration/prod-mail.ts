import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export const ProdTransporter = (configService: ConfigService) => ({
  host: configService.get<string>('MAIL_HOST'),
  port: configService.get<number>('MAIL_PORT'),
  secure: false,
  auth: {
    user: configService.get<string>('MAIL_USER'),
    pass: configService.get<string>('MAIL_PASS'),
  }
})