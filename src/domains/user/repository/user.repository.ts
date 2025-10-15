import { DataSource, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { ConflictException, Injectable } from "@nestjs/common";
import { IUserAuth } from "../../../types/auth";
import { hashPassword } from "../../../utils/password.util";
import { IUser } from "../../../types/user";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(userData: IUserAuth): Promise<IUser> {
    const existingUser = await this.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    userData.password = await hashPassword(userData.password);

    const user = this.create(userData);
    await this.save(user);
    return user;
  }

}  
