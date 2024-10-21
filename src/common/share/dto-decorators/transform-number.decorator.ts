import { applyDecorators } from "@nestjs/common";
import { Transform, TransformOptions } from "class-transformer";
import { isNumber, isNumberString } from "class-validator";

export function TransformNumber(options: TransformOptions = {}) {
    return applyDecorators(Transform(({ value }) => value && (isNumber(value) || isNumberString(value)) && Number(value), options));
}
