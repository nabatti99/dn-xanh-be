import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LandfillService } from "./landfill.service";
import { AdminAuthGuard } from "@modules/user/guards/admin-auth.guard";
import { ReportLandfillReportDto } from "./dtos/report-landfill-request.dto";
import { GetAuthUser } from "@modules/user/decorators/get-user.decorator";
import { UserEntity } from "@modules/user/entities/user.entity";

@ApiTags("Landfill")
@Controller("landfill")
export class LandfillController {
    constructor(private readonly userService: LandfillService) {}

    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @Post("report")
    report(@Body() reportLandfillReportDto: ReportLandfillReportDto, @GetAuthUser() user: UserEntity) {
        return this.userService.report(reportLandfillReportDto, user);
    }
}
