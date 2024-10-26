import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class SmartRecycleBinClaimRewardRequestDto {
    @ApiProperty({
        type: String,
        description: "Claim token.",
        example: "your-claim-token",
    })
    @IsNotEmpty()
    @IsString()
    @Expose()
    token: string;
}
