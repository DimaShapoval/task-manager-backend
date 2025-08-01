import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "pt",
    synchronize: false,
    logging: false,
    entities: ['build/src/**/entity/*.entity.js'],
    migrations: ['build/migrations/**/*.js'],
})
