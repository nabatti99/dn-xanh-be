import { TransformNumber } from "@common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SmartRecycleBinSubmitRequestDto {
    @ApiProperty({
        type: String,
        description: "Embedded system ID of the physical recycle bin.",
        example: "DN-SMT-001_RECYCLABLE",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    embeddedSystemId: string;

    @ApiProperty({
        type: Number,
        description: "Amount of waste in the physical recycle bin.",
        example: 2.5,
    })
    @IsNumber()
    @TransformNumber()
    @Expose()
    volume: number;

    @ApiProperty({
        type: Boolean,
        description: "Whether the waste object is classified and litered on true trash.",
        example: true,
    })
    @IsBoolean()
    @Expose()
    isCorrect: boolean;
}
