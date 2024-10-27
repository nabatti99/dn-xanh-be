import axios from "axios";
import { CAMERA_SERVER_BASE_URL } from "../config";
import { baseRequestConfig, baseRequestFailInterceptor, baseRequestInterceptor, baseResponseFailInterceptor, baseResponseInterceptor } from "./base.request";

export const cameraServerRequest = axios.create({
    ...baseRequestConfig,
    baseURL: CAMERA_SERVER_BASE_URL,
});

const NAME = "Camera Server";

cameraServerRequest.interceptors.request.use(
    (config) => baseRequestInterceptor(NAME, config),
    (error) => baseRequestFailInterceptor(NAME, error)
);

cameraServerRequest.interceptors.response.use(
    (response) => baseResponseInterceptor(NAME, response),
    (error) => baseResponseFailInterceptor(NAME, error)
);
