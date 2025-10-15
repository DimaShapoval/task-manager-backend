import { localMailConfig } from './../../config/mail-local.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProdTransporter } from './configuration/prod-mail';
import { localTransport } from './configuration/local-mail';
import { MailingService } from './service/mailing.service';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        return {
          transport: isProduction ? ProdTransporter(configService) : localTransport(configService),
          defaults: {
            from: `"No Reply" <task-manager@gmail.com>`
          },
          template: {
            dir: join(process.cwd(), 'src', 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          }
        };
      },
    })
  ],
  providers: [MailingService],
  exports: [MailingService]
})
export class MailModule {}
