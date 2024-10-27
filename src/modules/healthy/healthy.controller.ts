import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthyService } from "./healthy.service";

@ApiTags("Healthy")
@Controller("healthy")
export class HealthyController {
    constructor(private readonly healthyService: HealthyService) {}

    @Get()
    healthy() {
        return this.healthyService.healthy();
    }

    @Post("echo")
    echo(@Body() body: Record<string, any>) {
        return this.healthyService.echo(body);
    }
}
