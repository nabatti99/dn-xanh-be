import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SMART_RECYCLE_BIN_REPOSITORY_INJECT_KEY, SmartRecycleBinEntity } from "./entities/smart-recycle-bin.entity";
import { SmartRecycleBinCreateRequestDto } from "./dtos/smart-recycle-bin-create-request.dto";
import { PHYSICAL_RECYCLE_BIN_REPOSITORY_INJECT_KEY, PhysicalRecycleBinEntity } from "./entities/landfill.entity";

@Injectable()
export class LandfillService {
    constructor(
        @Inject(PHYSICAL_RECYCLE_BIN_REPOSITORY_INJECT_KEY)
        private physicalRecycleBinRepository: Repository<PhysicalRecycleBinEntity>,
        @Inject(SMART_RECYCLE_BIN_REPOSITORY_INJECT_KEY)
        private smartRecycleBinRepository: Repository<SmartRecycleBinEntity>,
        private jwtService: JwtService
    ) {}

    async report(smartRecycleBinCreateRequestDto: SmartRecycleBinCreateRequestDto) {
        const newSmartRecycleBin = await this.smartRecycleBinRepository.save({
            locationLatitude: smartRecycleBinCreateRequestDto.location.latitude,
            locationLongitude: smartRecycleBinCreateRequestDto.location.longitude,
        });

        console.log(newSmartRecycleBin.id);

        const newPhysicalRecycleBins = await this.physicalRecycleBinRepository.save(
            smartRecycleBinCreateRequestDto.physicalRecycleBins.map((physicalRecycleBin) => ({
                embeddedSystemId: physicalRecycleBin.embeddedSystemId,
                maxVolume: physicalRecycleBin.maxVolume,
                wasteType: physicalRecycleBin.wasteType,
                smartRecycleBinId: newSmartRecycleBin.id,
            }))
        );

        newSmartRecycleBin.physicalRecycleBins = newPhysicalRecycleBins;

        return newSmartRecycleBin;
    }
}
