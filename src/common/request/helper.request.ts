import { AxiosError } from "axios";

export class AppAxiosError extends AxiosError<{ error: any; timestamp: number }> {}

export function parseAppAxiosError(error: AppAxiosError) {
    return error.response?.data?.error || error.request?.data?.error || error.message;
}
