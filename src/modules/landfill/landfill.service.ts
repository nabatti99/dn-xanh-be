import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { LANDFILL_REPOSITORY_INJECT_KEY, LandfillEntity } from "./entities/landfill.entity";
import { ReportLandfillReportDto } from "./dtos/report-landfill-request.dto";
import { UserEntity } from "@modules/user/entities/user.entity";

@Injectable()
export class LandfillService {
    constructor(
        @Inject(LANDFILL_REPOSITORY_INJECT_KEY)
        private landfillRepository: Repository<LandfillEntity>
    ) {}

    async report(reportLandfillReportDto: ReportLandfillReportDto, reportBy: UserEntity) {
        const newLandfill = await this.landfillRepository.save({
            name: reportLandfillReportDto.name,
            description: reportLandfillReportDto.description,
            locationLatitude: reportLandfillReportDto.location.latitude,
            locationLongitude: reportLandfillReportDto.location.longitude,
            type: reportLandfillReportDto.type,
            reportedBy: reportBy,
        });

        return newLandfill;
    }
}
