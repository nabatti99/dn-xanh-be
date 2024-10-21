import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User, USER_REPOSITORY_INJECT_KEY } from "./entities/user.entity";
import { UserRegisterRequestDto } from "./dtos/user-register-request.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY_INJECT_KEY)
        private userRepository: Repository<User>
    ) {}

    async register(userRegisterRequestDto: UserRegisterRequestDto) {
        this.userRepository.save({
            firstName: userRegisterRequestDto.firstName,
            lastName: userRegisterRequestDto.lastName,
            email: userRegisterRequestDto.email,
            password: bcrypt.hashSync(userRegisterRequestDto.password, 16),
        });
    }
}
