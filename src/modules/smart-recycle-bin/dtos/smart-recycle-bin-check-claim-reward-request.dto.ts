import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class SmartRecycleBinCheckClaimRewardRequestDto {
    @ApiProperty({
        type: String,
        description: "Classification history Id",
        example: "classification-history-id",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    smartRecycleBinClassificationHistoryId: string;
}
