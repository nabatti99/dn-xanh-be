import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseResponseDto } from "./responses.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class BaseErrorDto extends BaseResponseDto {
    @ApiProperty({
        type: String,
        format: "string",
        description: "Error description.",
        example: "Unexpected error",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    error: string;
}

export class InternalServerErrorDto extends BaseErrorDto {
    @ApiProperty({
        type: String,
        format: "string",
        description: "Error description.",
        default: "Internal Server Error",
        example: "Internal Server Error",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    error: string;
}

export class NotFoundErrorDto extends BaseErrorDto {
    @ApiProperty({
        type: String,
        format: "string",
        description: "Error description.",
        default: "Resource not found",
        example: "Resource not found",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    error: string;
}

export class BadRequestErrorDto extends BaseErrorDto {
    @ApiProperty({
        type: String,
        format: "string",
        description: "Error description.",
        default: "Bad Request",
        example: "Bad Request",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    error: string;
}

export class UnauthorizedErrorDto extends BaseErrorDto {
    @ApiProperty({
        type: String,
        format: "string",
        description: "Error description.",
        default: "Unauthorized",
        example: "Unauthorized",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    error: string;
}
