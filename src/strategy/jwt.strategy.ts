import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtPayload } from '../types/auth';
import { IUser } from '../types/user';
import { UserRepository } from "../domains/user/repository/user.repository";

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_KEY'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req?.cookies?.accessToken

      ]),
    });
  }

  async validate(payload: IJwtPayload): Promise<IUser> {
    const { email, isEmailConfirmed } = payload;
    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });
    console.log(isEmailConfirmed)

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    } else if (!isEmailConfirmed) {
      throw new BadRequestException('Email not confirmed');
    }

    return user;
  }
}