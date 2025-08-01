import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../user/entity/user.entity";
import { IUserAuth } from "../../types/auth";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class UserAuthRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(userData: IUserAuth): Promise<{email: string}> {
        const existingUser = await this.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const user = this.create(userData);
        await this.save(user);
        return { email: user.email};
    }
}  
