import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";

export const GetAuthUserId = createParamDecorator((data: undefined, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return user;
});
