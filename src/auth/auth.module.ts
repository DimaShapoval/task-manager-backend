import { Module } from "@nestjs/common";
import { UserAuthController } from "./controller/user-auth.controller";
import { UserAuthService } from "./service/user-auth.service";
import { Type } from "class-transformer";
import { UserAuthRepository } from "./repository/user-auth.repository";

@Module({
    imports: [],
    controllers: [UserAuthController],
    providers: [UserAuthService, UserAuthRepository],
    exports: [UserAuthService],
})
export class AuthModule {}