import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AUTH_ERROR, AUTH_GUARD_KEY } from "./auth.constants";

export const GetAuthData = createParamDecorator((_: unknown, context: ExecutionContext) => {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return request[AUTH_GUARD_KEY];
});

export const GetAuthToken = createParamDecorator((_: unknown, context: ExecutionContext) => {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return request.headers["authorization"];
});

export const GetUserId = createParamDecorator((_: unknown, context: ExecutionContext) => {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const userId = request[AUTH_GUARD_KEY]["cognito:username"];
    if (!userId) throw new UnauthorizedException({ message: AUTH_ERROR.NOT_FOUND_USERNAME });

    return userId;
});
