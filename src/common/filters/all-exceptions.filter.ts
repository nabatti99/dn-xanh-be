import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AppAxiosError, parseAppAxiosError } from "src/common/request";
import { BadRequestErrorDto, BaseErrorDto, InternalServerErrorDto } from "../share";
import { stringifyLog } from "../utils";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception instanceof NotFoundException) {
            const message = exception.message;
            this.logger.error(stringifyLog("NotFound Exception: ", message, exception.stack));

            const responseDto = new BadRequestErrorDto();
            responseDto.error = message;

            return response.status(HttpStatus.NOT_FOUND).json(responseDto);
        }

        if (exception instanceof UnauthorizedException) {
            const message = exception.message;
            this.logger.error(stringifyLog("Unauthorized Exception: ", message, exception.stack));

            const responseDto = new BadRequestErrorDto();
            responseDto.error = message;

            return response.status(HttpStatus.UNAUTHORIZED).json(responseDto);
        }

        if (exception instanceof BadRequestException) {
            const exceptionResponse = exception.getResponse();
            const error = exceptionResponse["message"] || exceptionResponse;

            this.logger.error(stringifyLog("Bad Request: ", error, exception.stack));

            const responseDto = new BadRequestErrorDto();
            if (error instanceof Array) {
                const setErrors = new Set(error);
                responseDto.error = Array.from(setErrors).join("; ");
            } else if (error instanceof Object) responseDto.error = JSON.stringify(error);
            else responseDto.error = error;

            return response.status(HttpStatus.BAD_REQUEST).json(responseDto);
        }

        if (exception instanceof HttpException) {
            const status = exception.getStatus();

            this.logger.error(stringifyLog("Http Exception: ", exception.message, exception.stack));

            const responseDto = new BaseErrorDto();
            responseDto.error = exception.message;

            return response.status(status).json(responseDto);
        }

        if (exception instanceof AppAxiosError) {
            const message = parseAppAxiosError(exception);
            this.logger.error(stringifyLog("AppAxios Exception: ", message, exception.stack));

            const responseDto = new InternalServerErrorDto();
            if (message instanceof Object) responseDto.error = JSON.stringify(message);
            else responseDto.error = message;

            return response.status(exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR).json(responseDto);
        }

        if (exception instanceof Error) {
            this.logger.error(stringifyLog("Error: ", exception.message, exception.stack));

            const responseDto = new InternalServerErrorDto();
            responseDto.error = exception.message;

            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseDto);
        }

        const message = exception["message"] || exception;
        this.logger.error(stringifyLog("Unknown Error: ", message, exception["stack"] || "Stack is not available"));

        const responseDto = new InternalServerErrorDto();
        responseDto.error = message;

        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseDto);
    }
}
