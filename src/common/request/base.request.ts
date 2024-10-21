import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { stringifyLog } from "src/common";
import { AppAxiosError, parseAppAxiosError } from "./helper.request";

export const baseRequestConfig: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json",
    },
};

// Global request interceptor
export const baseRequestInterceptor = (requestName: string, config: InternalAxiosRequestConfig) => {
    if (process.env.NODE_ENV === "development") console.log(stringifyLog(requestName, "Request:", config.method, config.url, config.data, config.params));
    return config;
};

export const baseRequestFailInterceptor = (requestName: string, error: any) => {
    if (process.env.NODE_ENV === "development") console.log(stringifyLog(requestName, "Request Error:", error));
    return Promise.reject(error);
};

// Global response interceptor
export const baseResponseInterceptor = (requestName: string, response: AxiosResponse) => {
    if (process.env.NODE_ENV === "development") console.log(stringifyLog(requestName, "Response:", response.config.method, response.config.url, response.status, response.data));
    return response.data;
};

export const baseResponseFailInterceptor = (requestName: string, error: AppAxiosError) => {
    const responseError = new AppAxiosError(error.message, error.code, error.config, error.request, error.response);
    if (process.env.NODE_ENV === "development") console.log(stringifyLog(requestName, "Response Error:", error.status, parseAppAxiosError(responseError)));

    return Promise.reject(responseError);
};
