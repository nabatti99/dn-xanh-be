import { TransformNumber } from "@common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { LandfillPollutionLevel, LandfillType } from "../constants";

export class LandfillLocationRequestDto {
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

export class ReportLandfillReportDto {
    @ApiProperty({
        type: String,
        description: "Name of the landfill.",
        example: "Bãi rác tự phát 1",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    name: string;

    @ApiProperty({
        type: String,
        description: "Description of the landfill.",
        example: "Mô tả bãi rác",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    description: string;

    @ApiProperty({
        type: LandfillLocationRequestDto,
        description: "Location of the landfill.",
    })
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => LandfillLocationRequestDto)
    @Expose()
    location: LandfillLocationRequestDto;

    @ApiProperty({
        type: LandfillType,
        enum: LandfillType,
        description: "Type of the landfill.",
        example: LandfillType.ILLEGAL,
    })
    @IsNotEmpty()
    @IsEnum(LandfillType)
    @Expose()
    type: LandfillType;

    @ApiProperty({
        type: LandfillPollutionLevel,
        enum: LandfillPollutionLevel,
        description: "Level of the landfill.",
        example: LandfillPollutionLevel.BASIC_POLLUTANTS,
    })
    @IsNotEmpty()
    @IsEnum(LandfillPollutionLevel)
    @Expose()
    level: LandfillPollutionLevel;
}
