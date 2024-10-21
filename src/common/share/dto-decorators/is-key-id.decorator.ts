import { applyDecorators } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptions } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsUUID } from "class-validator";

export function IsKeyId(options: ApiPropertyOptions = {}) {
    const MESSAGE = "key_id must be UUID v4 format.";

    return applyDecorators(
        ApiProperty({
            type: String,
            format: "uuid",
            example: "0df7f900-6873-4de8-8efa-23aab2797ebe",
            ...options,
        }),
        IsUUID("4", { message: MESSAGE }),
        Expose()
    );
}
