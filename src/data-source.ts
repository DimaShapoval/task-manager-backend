import "reflect-metadata"
import { DataSource } from "typeorm"
import { ALL_ENTITIES } from "./all-entites.const"

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: ALL_ENTITIES,
    migrations: ['src/migrations/**/*.ts'],
})

export default AppDataSource;
