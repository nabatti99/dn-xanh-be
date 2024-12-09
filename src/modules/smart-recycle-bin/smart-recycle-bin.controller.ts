import { ApiMultiFile } from "@common/swagger/decorators/api-multi-file";
import { GetAuthUser } from "@modules/user/decorators/get-user.decorator";
import { AdminAuthGuard } from "@modules/user/guards/admin-auth.guard";
import { AuthGuard } from "@modules/user/guards/auth.guard";
import { Body, Controller, Get, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { SmartRecycleBinCheckClaimRewardRequestDto } from "./dtos/smart-recycle-bin-check-claim-reward-request.dto";
import { SmartRecycleBinClaimRewardRequestDto } from "./dtos/smart-recycle-bin-claim-reward-request.dto";
import { SmartRecycleBinClassifyRequestDto } from "./dtos/smart-recycle-bin-classify-request.dto";
import { SmartRecycleBinCreateRequestDto } from "./dtos/smart-recycle-bin-create-request.dto";
import { SmartRecycleBinGetRequestDto } from "./dtos/smart-recycle-bin-get-request.dto";
import { SmartRecycleBinService } from "./smart-recycle-bin.service";

@ApiTags("Smart Recycle Bin")
@Controller("smart-recycle-bin")
export class SmartRecycleBinController {
    constructor(private readonly smartRecycleBinService: SmartRecycleBinService) {}

    @Get()
    get(@Query() smartRecycleBinGetRequestDto: SmartRecycleBinGetRequestDto) {
        return this.smartRecycleBinService.get(smartRecycleBinGetRequestDto);
    }

    @Get("all")
    getAll() {
        return this.smartRecycleBinService.getAll();
    }

    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @Post("create")
    create(@Body() smartRecycleBinCreateRequestDto: SmartRecycleBinCreateRequestDto) {
        return this.smartRecycleBinService.create(smartRecycleBinCreateRequestDto);
    }

    @Post("classify-waste-images")
    @ApiConsumes("multipart/form-data")
    @ApiMultiFile("files")
    @UseInterceptors(FilesInterceptor("files"))
    classifyWasteImages(@UploadedFiles() files: Array<Express.Multer.File>) {
        return this.smartRecycleBinService.classifyWasteImages(files);
    }

    @Post("upload-and-classify")
    uploadAndClassify(@Req() request: Request) {
        return this.smartRecycleBinService.uploadAndClassify(request);
    }

    @Post("classify")
    classify(@Body() smartRecycleBinClassifyRequestDto: SmartRecycleBinClassifyRequestDto) {
        return this.smartRecycleBinService.classify(smartRecycleBinClassifyRequestDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post("claim-reward")
    claimReward(@Body() smartRecycleBinClaimRewardRequestDto: SmartRecycleBinClaimRewardRequestDto, @GetAuthUser() user) {
        return this.smartRecycleBinService.claimReward(smartRecycleBinClaimRewardRequestDto, user);
    }

    @Post("check-claim-reward")
    checkClaimReward(@Body() smartRecycleBinCheckClaimRewardRequestDto: SmartRecycleBinCheckClaimRewardRequestDto) {
        return this.smartRecycleBinService.checkClaimReward(smartRecycleBinCheckClaimRewardRequestDto);
    }
}
