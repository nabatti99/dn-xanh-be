import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { Role } from "../constants";

@Injectable()
export class AdminAuthGuard extends AuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user.role !== Role.ADMIN) throw new UnauthorizedException("Only admin can access this resource");

        return true;
    }
}
