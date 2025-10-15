import { ConfigService } from '@nestjs/config';
import { MailingService } from './../../mail/service/mailing.service';
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserAuth } from "../../../types/auth";
import { comparePassword } from "../../../utils/password.util";
import { JwtService } from "@nestjs/jwt";
import { UserAuthDto } from "../dto/user-auth.dto";
import { UserRepository } from "../../user/repository/user.repository";
import { IUser } from "../../../types/user";

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailingService: MailingService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(userData: IUserAuth): Promise<{confirmToken: string, email: string}> {
    const user = await this.userRepository.createUser(userData);
    const payload = { id: user.id, isEmailConfirmed: user.isEmailConfirmed };
    const confirmToken = this.jwtService.sign(payload);
    
    if (!!confirmToken && !!user) {
      const confirmUrl = `${this.configService.get<string>('CLIENT_URL')}/confirm-email?token=${confirmToken}`;
      
      await this.mailingService.sendEmail(
        user.email,
        'Confirm your email',
        './auth/confirm-email',
        { name: user.email, url: confirmUrl }
      );
    }

    return {confirmToken, email: user.email};
  }

  async signIn({email, password}: UserAuthDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    } else if (!user.isEmailConfirmed) {
      throw new BadRequestException('Email not confirmed');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, id: user.id, isEmailConfirmed: user.isEmailConfirmed };
    const accessToken: string = await this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken: string = await this.jwtService.sign(payload, { expiresIn: '7d' });
    
    return { accessToken, refreshToken };
  }
}