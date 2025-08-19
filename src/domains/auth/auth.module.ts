import * as dotenv from 'dotenv';
import { Module } from "@nestjs/common";
import { UserAuthController } from "./controller/user-auth.controller";
import { UserAuthService } from "./service/user-auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserRepository } from "../user/repository/user.repository";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../../strategy/jwt.strategy";
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config();

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwtKey'),
                signOptions: { expiresIn: 3600 },
            })
        }),
    ],
    controllers: [UserAuthController],
    providers: [UserAuthService, UserRepository, JwtStrategy],
    exports: [UserAuthService, JwtStrategy, PassportModule],
})
export class AuthModule { }