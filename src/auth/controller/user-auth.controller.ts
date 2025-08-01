import { ApiOkResponse } from '@nestjs/swagger';
import { UserAuthDto, UserAuthResponseDto } from '../dto/user-auth.dto';
import { UserAuthService } from './../service/user-auth.service';
import { Body, Controller, Post } from "@nestjs/common";

@Controller('v1/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) { }
  @Post('sign-up')
  @ApiOkResponse({
    description: 'User successfully registered',
    type: UserAuthResponseDto,
  })
  async signUp(@Body() userData: UserAuthDto) {
    return await this.userAuthService.registerUser(userData);
  }
}