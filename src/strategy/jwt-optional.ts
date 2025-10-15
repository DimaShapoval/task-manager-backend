import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtOptionalStrategy extends PassportStrategy(Strategy, 'jwt-optional') {
  constructor(private configService: ConfigService) {
    super({
      secretOrKey: configService.get<string>('JWT_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });

  }

  async validate(payload: any) {
    if (!payload.isEmailConfirmed) {
      return null;
    }

    return payload;
  }
}