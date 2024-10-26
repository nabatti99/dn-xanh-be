import { TransformNumber } from "@common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { WasteType } from "../constants";

export class SmartRecycleBinClassifyRequestDto {
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
        type: WasteType,
        enum: WasteType,
        description: "Type of waste in the physical recycle bin.",
        example: WasteType.RECYCLABLE,
    })
    @IsEnum(WasteType)
    @Expose()
    wasteType: WasteType;
}
