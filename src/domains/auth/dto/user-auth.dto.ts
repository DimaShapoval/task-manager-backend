import { IsString } from "class-validator";
import { IsValidPassword } from "../validator/is-valid-password.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class UserAuthDto {
    @ApiProperty({ example: 'email@test.com'})
    @IsString()
    email: string;

    @ApiProperty({ example: 'StrongPassword123!' })
    @IsString()
    @IsValidPassword()
    password: string;
}

export class UserAuthResponseDto {
    @ApiProperty({ example: 'email@test.com'})
    email: string;
}