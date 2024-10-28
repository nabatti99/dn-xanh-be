import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class SmartRecycleBinGetRequestDto {
    @ApiProperty({
        type: String,
        description: "ID of the smart recycle bin.",
        example: "DN-SMT-001",
    })
    @IsString()
    @Expose()
    id: string;
}
