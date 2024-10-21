import { applyDecorators } from "@nestjs/common";
import { Transform, TransformOptions } from "class-transformer";
import { matches } from "class-validator";

export function TransformInteger(options: TransformOptions = {}) {
    return applyDecorators(Transform(({ value }) => matches(String(value), /^0$|^[1-9][0-9]*$/) && Number(value), options));
}
