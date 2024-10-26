import axios from "axios";
import { AI_SERVER_BASE_URL } from "../config";
import { baseRequestConfig, baseRequestFailInterceptor, baseRequestInterceptor, baseResponseFailInterceptor, baseResponseInterceptor } from "./base.request";

export const aiServerRequest = axios.create({
    ...baseRequestConfig,
    baseURL: AI_SERVER_BASE_URL,
});

const NAME = "AI Server";

aiServerRequest.interceptors.request.use(
    (config) => baseRequestInterceptor(NAME, config),
    (error) => baseRequestFailInterceptor(NAME, error)
);

aiServerRequest.interceptors.response.use(
    (response) => baseResponseInterceptor(NAME, response),
    (error) => baseResponseFailInterceptor(NAME, error)
);
