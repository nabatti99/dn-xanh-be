import axios from "axios";
import { SERVER_API_BASE_URL } from "../config";
import { baseRequestConfig, baseRequestFailInterceptor, baseRequestInterceptor, baseResponseFailInterceptor, baseResponseInterceptor } from "./base.request";

export const serverRequest = axios.create({
    ...baseRequestConfig,
    baseURL: SERVER_API_BASE_URL,
});

const NAME = "ServerName";

serverRequest.interceptors.request.use(
    (config) => baseRequestInterceptor(NAME, config),
    (error) => baseRequestFailInterceptor(NAME, error)
);

serverRequest.interceptors.response.use(
    (response) => baseResponseInterceptor(NAME, response),
    (error) => baseResponseFailInterceptor(NAME, error)
);
