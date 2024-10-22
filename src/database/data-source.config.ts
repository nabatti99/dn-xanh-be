import { DataSource } from "typeorm";
import { join } from "path";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "./snake-naming.strategy";

dotenv.config({
    path: join(__dirname, "../../.env"),
});

const dataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    schema: process.env.DB_SCHEMA,
    namingStrategy: new SnakeNamingStrategy(),
    migrationsRun: true,
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
    synchronize: false,
    logging: process.env.NODE_ENV === "production" ? false : true,
});

export default dataSource;
