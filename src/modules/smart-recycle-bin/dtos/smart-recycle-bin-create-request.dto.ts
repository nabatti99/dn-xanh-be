import { TransformNumber } from "@common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsEnum, IsNotEmptyObject, IsNumber, IsObject, IsPositive, IsString, Length, ValidateNested } from "class-validator";
import { WasteType } from "../constants";

export class SmartRecycleBinLocationRequestDto {
    @ApiProperty({
        type: Number,
        description: "The smart recycle bin's latitude.",
        example: 16.06,
        default: 16.06,
    })
    @IsNumber()
    @TransformNumber()
    @Expose()
    latitude: number;

    @ApiProperty({
        type: Number,
        description: "The smart recycle bin's longitude.",
        example: -251.84,
        default: -251.84,
    })
    @IsNumber()
    @TransformNumber()
    @Expose()
    longitude: number;
}

export class PhysicalRecycleBinCreateRequestDto {
    @ApiProperty({
        type: String,
        description: "The physical recycle bin's embedded system ID.",
        example: "DN-SMT-001_RECYCLABLE",
    })
    @IsString()
    @Expose()
    embeddedSystemId: string;

    @ApiProperty({
        type: Number,
        description: "The physical recycle bin's longitude.",
        example: 100,
    })
    @IsNumber()
    @IsPositive()
    @TransformNumber()
    @Expose()
    maxVolume: number;

    @ApiProperty({
        type: String,
        enum: WasteType,
        description: `The physical recycle bin's waste type: ${Object.values(WasteType).join(", ")}.`,
        example: WasteType.RECYCLABLE,
    })
    @IsEnum(WasteType)
    @Expose()
    wasteType: WasteType;
}

export class SmartRecycleBinCreateRequestDto {
    @ApiProperty({
        type: String,
        description: "The smart recycle bin's name.",
        example: "DN-SMT-001",
    })
    @IsString()
    @Expose()
    name: string;

    @ApiProperty({
        type: SmartRecycleBinLocationRequestDto,
        description: "The smart recycle bin's location.",
    })
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => SmartRecycleBinLocationRequestDto)
    @Expose()
    location: SmartRecycleBinLocationRequestDto;

    @ApiProperty({
        type: PhysicalRecycleBinCreateRequestDto,
        description: "Physical recycle bins in the smart recycle bin.",
        isArray: true,
    })
    @ArrayMaxSize(3, { message: "The number of physical recycle bins must be 3." })
    @ArrayMinSize(3, { message: "The number of physical recycle bins must be 3." })
    @IsObject({ each: true })
    @IsNotEmptyObject(
        {
            nullable: false,
        },
        { each: true }
    )
    @ValidateNested({
        each: true,
    })
    @Type(() => PhysicalRecycleBinCreateRequestDto)
    @Expose()
    physicalRecycleBins: PhysicalRecycleBinCreateRequestDto[];
}
