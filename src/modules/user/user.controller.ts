import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserRegisterRequestDto } from "./dtos/user-register-request.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("register")
    register(@Body() userRegisterRequestDto: UserRegisterRequestDto) {
        return this.userService.register(userRegisterRequestDto);
    }
}
