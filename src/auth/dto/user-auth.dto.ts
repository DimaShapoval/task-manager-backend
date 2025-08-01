import { IsString } from "class-validator";
import { IsValidPassword } from "../validator/is-valid-password.decorator";

export class UserAuthDto {
    @IsString()
    email: string;

    @IsString()
    @IsValidPassword()
    password: string;
}

export class UserAuthResponseDto {
    email: string;
}