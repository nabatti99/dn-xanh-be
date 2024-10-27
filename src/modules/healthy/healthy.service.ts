import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthyService {
    constructor() {}

    async healthy() {
        return {
            status: "healthy",
        };
    }

    async echo(body: Record<string, any>) {
        if (typeof body !== "object") {
            return {
                message: "Invalid body",
            };
        }

        return {
            body,
        };
    }
}
