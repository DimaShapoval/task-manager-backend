import { ConfigService } from "@nestjs/config"
import * as nodemailer from "nodemailer"

export const localTransport = (configService: ConfigService) => ({
    host: configService.get<string>('LOCAL_MAIL_HOST'),
    port: configService.get<number>('LOCAL_MAIL_PORT'),
    secure: false,
});