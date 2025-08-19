import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthDto, UserAuthResponseDto } from '../dto/user-auth.dto';
import { UserAuthService } from '../service/user-auth.service';
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User Authentication')
@Controller('v1/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) { }
  @Post('sign-up')
  @ApiOkResponse({
    description: 'User successfully registered',
    type: UserAuthResponseDto,
  })
  async signUp(@Body() userData: UserAuthDto): Promise<{ email: string }> {
    return await this.userAuthService.registerUser(userData);
  }

  @Post('sign-in')
  @ApiOkResponse({
    description: 'User successfully logged in',
    type: UserAuthResponseDto,
  })
  async signIn(@Body() userData: UserAuthDto): Promise<{ accessToken: string }> {
    return await this.userAuthService.signIn(userData);
  }
}