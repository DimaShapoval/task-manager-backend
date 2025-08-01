import { Injectable } from "@nestjs/common";
import { UserAuthRepository } from "../repository/user-auth.repository";
import { IUserAuth } from "../../types/auth";

@Injectable()
export class UserAuthService {
  constructor(private userAuthRepository: UserAuthRepository) {}

  async registerUser(userData: IUserAuth): Promise<{email: string}> {
    return await this.userAuthRepository.createUser(userData);
  }
}