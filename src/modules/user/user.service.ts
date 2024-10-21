import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity, USER_REPOSITORY_INJECT_KEY } from "./entities/user.entity";
import { UserRegisterRequestDto } from "./dtos/user-register-request.dto";
import * as bcrypt from "bcrypt";
import { UserLoginRequestDto } from "./dtos/user-login-request.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY_INJECT_KEY)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    async register(userRegisterRequestDto: UserRegisterRequestDto) {
        const newUser = await this.userRepository.save({
            firstName: userRegisterRequestDto.firstName,
            lastName: userRegisterRequestDto.lastName,
            email: userRegisterRequestDto.email,
            password: bcrypt.hashSync(userRegisterRequestDto.password, 16),
        });

        return {
            access_token: await this.generateAccessToken(newUser),
        };
    }

    async login(userLoginRequest: UserLoginRequestDto) {
        const existedUser = await this.userRepository.findOne({
            where: {
                email: userLoginRequest.email,
            },
        });

        if (!existedUser) throw new Error("User not found");
        if (!bcrypt.compareSync(userLoginRequest.password, existedUser.password)) throw new Error("Password is incorrect");

        return {
            access_token: await this.generateAccessToken(existedUser),
        };
    }

    async generateAccessToken(user: UserEntity) {
        const jwtPayload = {
            sub: user.id,
            email: user.email,
        };

        return this.jwtService.sign(jwtPayload);
    }
}
