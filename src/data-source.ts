import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./user/entity/user.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "pt",
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: ['migrations/**/*.ts'],
})
