import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthDto, UserAuthResponseDto } from '../dto/user-auth.dto';
import { UserAuthService } from '../service/user-auth.service';
import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { accessTokenTime, cookieTokenOptions } from '../../../const/cookie-options.const';

@ApiTags('User Authentication')
@Controller('v1/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) { }
  @Post('sign-up')
  @ApiOkResponse({
    description: 'User successfully registered',
    type: UserAuthResponseDto,
  })
  async signUp(
    @Body() userData: UserAuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{email: string}> {
    const newUser = await this.userAuthService.registerUser(userData);
    response.cookie('confirmToken', newUser.confirmToken, cookieTokenOptions);
    return { email: newUser.email };
  }

  @Post('sign-in')
  @ApiOkResponse({
    description: 'User successfully logged in',
    type: UserAuthResponseDto,
  })
  async signIn(
    @Body() userData: UserAuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string, refreshToken: string }> {
    const userLogin = await this.userAuthService.signIn(userData);
    
    response.cookie('accessToken', userLogin.accessToken, {...cookieTokenOptions, maxAge: accessTokenTime} );
    response.cookie('refreshToken', userLogin.refreshToken, cookieTokenOptions );
    
    return { accessToken: userLogin.accessToken, refreshToken: userLogin.refreshToken };
  }
}