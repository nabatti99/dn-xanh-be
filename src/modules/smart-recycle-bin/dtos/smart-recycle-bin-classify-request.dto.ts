import { TransformNumber } from "@common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNotEmptyObject, IsNumber, IsObject, ValidateNested } from "class-validator";

export class SmartRecycleBinCreateRequestDto {
    @ApiProperty({
        type: Number,
        description: "The volume of waste.",
        example: 100,
    })
    @IsNumber()
    @TransformNumber()
    @Expose()
    maxVolume: number;
}
