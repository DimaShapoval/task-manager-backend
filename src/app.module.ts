import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domains/auth/auth.module';
import { AppDataSource } from './data-source';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from './domains/user/user.module';
import { TaskModule } from './domains/task/task.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { JwtOptionalStrategy } from './strategy/jwt-optional';
import { BoardModule } from './domains/board/board.module';
import { MailModule } from './domains/mail/mail.module';

@Module({
  imports: [
    UserModule, 
    AuthModule,
    BoardModule,
    MailModule,
    TypeOrmModule.forRoot(AppDataSource.options), 
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env']
    })
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, JwtOptionalStrategy],
  exports: [],
})
export class AppModule { }
