import { DataSource } from "typeorm";
import dataSource from "./data-source.config";

export const DATA_SOURCE_INJECT_KEY = "DATA_SOURCE";

export const databaseProvider = {
    provide: DATA_SOURCE_INJECT_KEY,
    useFactory: async () => dataSource.initialize(),
};
