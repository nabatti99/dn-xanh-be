import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SmartRecycleBinCreateRequestDto } from "./dtos/smart-recycle-bin-create-request.dto";
import { SmartRecycleBinService } from "./smart-recycle-bin.service";
import { AdminAuthGuard } from "@modules/user/guards/admin-auth.guard";

@ApiTags("Smart Recycle Bin")
@Controller("smart-recycle-bin")
export class SmartRecycleBinController {
    constructor(private readonly userService: SmartRecycleBinService) {}

    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @Post("create")
    create(@Body() smartRecycleBinCreateRequestDto: SmartRecycleBinCreateRequestDto) {
        return this.userService.create(smartRecycleBinCreateRequestDto);
    }

    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @Post("classify")
    classify(@Body() smartRecycleBinCreateRequestDto: SmartRecycleBinCreateRequestDto) {
        return this.userService.create(smartRecycleBinCreateRequestDto);
    }
}
