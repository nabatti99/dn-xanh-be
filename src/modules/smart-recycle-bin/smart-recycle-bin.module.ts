import { Module } from "@nestjs/common";
import { SmartRecycleBinController } from "./smart-recycle-bin.controller";
import { SmartRecycleBinService } from "./smart-recycle-bin.service";
import { smartRecycleBinRepository } from "./entities/smart-recycle-bin.entity";
import { userRepository } from "@modules/user/entities/user.entity";
import { physicalRecycleBinRepository } from "./entities/physical-recycle-bin.entity";
import { smartRecycleBinClassificationHistoryRepository } from "./entities/smart-recycle-bin-classification-history.entity";

@Module({
    imports: [],
    providers: [userRepository, physicalRecycleBinRepository, smartRecycleBinRepository, smartRecycleBinClassificationHistoryRepository, SmartRecycleBinService],
    controllers: [SmartRecycleBinController],
    exports: [],
})
export class SmartRecycleBinModule {}
