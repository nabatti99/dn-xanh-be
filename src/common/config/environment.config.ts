import * as dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const APP_SECRET = Boolean(Number(process.env.APP_SECRET));

// Domain
export const APP_HOST = Number(process.env.APP_HOST);
export const APP_PORT = Number(process.env.APP_PORT);
export const APP_API_PREFIX = process.env.APP_API_PREFIX;

export const APP_CORS_ORIGINS = [process.env.APP_CORS_ORIGIN, process.env.APP_CORS_ORIGIN_LOCAL, process.env.APP_CORS_ORIGIN_LOCAL_SHARE];

// API Server
export const SERVER_API_BASE_URL = process.env.SERVER_API_BASE_URL;
