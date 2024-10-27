import { Module } from "@nestjs/common";
import { HealthyController } from "./healthy.controller";
import { HealthyService } from "./healthy.service";

@Module({
    imports: [],
    providers: [HealthyService],
    controllers: [HealthyController],
    exports: [],
})
export class HealthyModule {}
