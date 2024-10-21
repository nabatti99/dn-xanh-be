import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { userRepository } from "./entities/user.entity";

@Module({
    imports: [],
    providers: [userRepository, UserService],
    controllers: [UserController],
    exports: [],
})
export class UserModule {}
