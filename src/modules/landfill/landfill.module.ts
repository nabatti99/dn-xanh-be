import { Module } from "@nestjs/common";
import { LandfillController } from "./landfill.controller";
import { LandfillService } from "./landfill.service";
import { smartRecycleBinRepository } from "./entities/smart-recycle-bin.entity";
import { userRepository } from "@modules/user/entities/user.entity";
import { physicalRecycleBinRepository } from "./entities/landfill.entity";

@Module({
    imports: [],
    providers: [userRepository, physicalRecycleBinRepository, smartRecycleBinRepository, LandfillService],
    controllers: [LandfillController],
    exports: [],
})
export class LandfillModule {}
