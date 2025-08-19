import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserAuth } from "../../../types/auth";
import { comparePassword } from "../../../utils/password.util";
import { JwtService } from "@nestjs/jwt";
import { UserAuthDto } from "../dto/user-auth.dto";
import { UserRepository } from "../../user/repository/user.repository";

@Injectable()
export class UserAuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async registerUser(userData: IUserAuth): Promise<{email: string}> {
    return await this.userRepository.createUser(userData);
  }

  async signIn({email, password}: UserAuthDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }
}