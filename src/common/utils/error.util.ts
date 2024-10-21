import { ValidationError } from "class-validator";

export function parseValidationErrors(errors: ValidationError[], parentProperty?: string): string[] {
    const parsedErrors = errors
        .map((error) => {
            if (error.constraints) {
                return Object.values(error.constraints).map((constraint) => (parentProperty ? `${parentProperty}.${constraint}` : constraint));
            }
            if (error.children) {
                return parseValidationErrors(error.children, parentProperty ? `${parentProperty}.${error.property}` : error.property);
            }
        })
        .flat();

    const setErrors = new Set(parsedErrors);
    return Array.from(setErrors);
}

export function stringifyError(error: any): string {
    if (error instanceof Array) {
        const setErrors = new Set(error);
        return Array.from(setErrors).join("; ");
    } else if (error instanceof Object) return JSON.stringify(error);
    else return error;
}
