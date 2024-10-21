import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AUTH_ERROR, AUTH_GUARD_KEY } from "./auth.constants";
import * as jwt from "jsonwebtoken";
import { extractTokenFromAuthorizationHeader } from "./auth.helper";
import { stringifyLog } from "../utils";

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const httpContext = context.switchToHttp();
            const request = httpContext.getRequest();

            const authorization = request.headers["authorization"];
            if (!authorization) throw new UnauthorizedException(AUTH_ERROR.NOT_FOUND_TOKEN);

            const token = extractTokenFromAuthorizationHeader(request.headers["authorization"]);
            if (!token) throw new UnauthorizedException(AUTH_ERROR.NOT_FOUND_TOKEN);

            try {
                const authData = jwt.decode(token, { json: true });
                if (!authData || !authData["cognito:username"]) throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);

                request[AUTH_GUARD_KEY] = authData;
            } catch (error) {
                this.logger.error(stringifyLog(error));
                throw new UnauthorizedException(AUTH_ERROR.INVALID_TOKEN);
            }
            return true;
        } catch (error) {
            this.logger.error(stringifyLog(error));
            throw error;
        }
    }
}
