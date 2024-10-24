import { Module } from "@nestjs/common";
import { LandfillController } from "./landfill.controller";
import { LandfillService } from "./landfill.service";
import { userRepository } from "@modules/user/entities/user.entity";
import { landfillRepository } from "./entities/landfill.entity";

@Module({
    imports: [],
    providers: [userRepository, landfillRepository, LandfillService],
    controllers: [LandfillController],
    exports: [],
})
export class LandfillModule {}
