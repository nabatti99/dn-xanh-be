import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class UserRegisterRequestDto {
    @ApiProperty({
        type: String,
        description: "The user's first name.",
        maxLength: 255,
        example: "Tên",
    })
    @IsString()
    @MaxLength(255)
    @Expose()
    firstName: string;

    @ApiProperty({
        type: String,
        description: "The user's last name.",
        maxLength: 255,
        example: "Họ và tên đệm",
    })
    @IsString()
    @MaxLength(255)
    @Expose()
    lastName: string;

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
