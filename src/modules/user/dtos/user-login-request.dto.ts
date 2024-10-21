import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class UserLoginRequestDto {
    @ApiProperty({
        type: String,
        description: "The user's email.",
        maxLength: 100,
        example: "Email",
    })
    @IsEmail()
    @MaxLength(100)
    @Expose()
    email: string;

    @ApiProperty({
        type: String,
        description: "The user's password.",
        maxLength: 100,
        example: "Mật khẩu",
    })
    @IsString()
    @MaxLength(100)
    @Expose()
    password: string;
}
