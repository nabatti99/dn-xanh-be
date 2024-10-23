import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SmartRecycleBinCreateRequestDto } from "./dtos/smart-recycle-bin-create-request.dto";
import { LandfillService } from "./landfill.service";
import { AdminAuthGuard } from "@modules/user/guards/admin-auth.guard";

@ApiTags("Landfill")
@Controller("landfill")
export class LandfillController {
    constructor(private readonly userService: LandfillService) {}

    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @Post("create")
    create(@Body() smartRecycleBinCreateRequestDto: SmartRecycleBinCreateRequestDto) {
        return this.userService.create(smartRecycleBinCreateRequestDto);
    }
}
