import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserRegisterRequestDto } from "./dtos/user-register-request.dto";
import { UserLoginRequestDto } from "./dtos/user-login-request.dto";
import { AuthGuard } from "./guards/auth.guard";
import { GetAuthUser } from "./decorators/get-user.decorator";
import { UserEntity } from "./entities/user.entity";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("register")
    register(@Body() userRegisterRequestDto: UserRegisterRequestDto) {
        return this.userService.register(userRegisterRequestDto);
    }

    @Post("login")
    login(@Body() userLoginRequestDto: UserLoginRequestDto) {
        return this.userService.login(userLoginRequestDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("me")
    me(@GetAuthUser() user: UserEntity) {
        return this.userService.getInfo(user);
    }
}
