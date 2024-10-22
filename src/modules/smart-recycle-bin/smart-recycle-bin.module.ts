import { Module } from "@nestjs/common";
import { SmartRecycleBinController } from "./smart-recycle-bin.controller";
import { SmartRecycleBinService } from "./smart-recycle-bin.service";
import { smartRecycleBinRepository } from "./entities/smart-recycle-bin.entity";
import { userRepository } from "@modules/user/entities/user.entity";
import { physicalRecycleBinRepository } from "./entities/physical-recycle-bin.entity";

@Module({
    imports: [],
    providers: [userRepository, physicalRecycleBinRepository, smartRecycleBinRepository, SmartRecycleBinService],
    controllers: [SmartRecycleBinController],
    exports: [],
})
export class SmartRecycleBinModule {}
