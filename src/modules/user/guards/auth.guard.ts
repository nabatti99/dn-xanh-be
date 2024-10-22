import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Repository } from "typeorm";
import { USER_REPOSITORY_INJECT_KEY, UserEntity } from "../entities/user.entity";
import { APP_SECRET } from "@common";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(USER_REPOSITORY_INJECT_KEY)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: APP_SECRET,
            });

            const userId = payload.sub;
            const userEmail = payload.email;

            const user = await this.userRepository.findOne({
                where: {
                    id: userId,
                },
            });
            if (!user || user.email !== userEmail) throw new UnauthorizedException();

            // Attach user to request object for later use
            request.user = user;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
