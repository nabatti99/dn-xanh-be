import { TransformNumber } from "@common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { WasteType } from "../constants";

export class SmartRecycleBinCaptureAndClassifyRequestDto {
    @ApiProperty({
        type: String,
        description: "Embedded camera server url.",
        example: "192.168.137.21",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    cameraUrl: string;
}
