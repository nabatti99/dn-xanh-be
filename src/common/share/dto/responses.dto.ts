import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class BaseResponseDto {
    @ApiProperty({
        type: Number,
        format: "timestamp",
        description: "Timestamp on server.",
        example: 1705640304319,
    })
    @IsInt()
    @IsPositive()
    @Expose()
    timestamp: number = Date.now();
}

export class StatusResponseDto {
    @ApiProperty({
        type: String,
        description: "Status of the request.",
        example: "ok",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    status: string;
}
