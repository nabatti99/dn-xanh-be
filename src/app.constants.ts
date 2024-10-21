import * as dotenv from "dotenv";

dotenv.config();

export const APP_API_PREFIX = process.env.APP_API_PREFIX;

export const APP_CORS_ORIGINS = JSON.parse(process.env.APP_CORS_ORIGINS);

export const APP_PORT = Number(process.env.APP_PORT);
