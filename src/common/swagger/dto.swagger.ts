import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { BadRequestErrorDto, InternalServerErrorDto, NotFoundErrorDto, UnauthorizedErrorDto } from "../share";

export const SwaggerRequestCommonError = () => {
    return applyDecorators(
        ApiBadRequestResponse({
            type: BadRequestErrorDto,
            description: "The request was malformed or missing required parameters.",
        }),
        ApiUnauthorizedResponse({
            type: UnauthorizedErrorDto,
            description: "The API authorization access token provided was invalid or missing.",
        }),
        ApiNotFoundResponse({
            type: NotFoundErrorDto,
            description: "The requested resource was not found.",
        }),
        ApiInternalServerErrorResponse({
            type: InternalServerErrorDto,
            description: "An unexpected error occurred on the server.",
        })
    );
};
