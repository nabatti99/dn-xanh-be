import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { SmartRecycleBinCreateRequestDto } from "./dtos/smart-recycle-bin-create-request.dto";
import { PHYSICAL_RECYCLE_BIN_REPOSITORY_INJECT_KEY, PhysicalRecycleBinEntity } from "./entities/physical-recycle-bin.entity";
import { SMART_RECYCLE_BIN_REPOSITORY_INJECT_KEY, SmartRecycleBinEntity } from "./entities/smart-recycle-bin.entity";
import { SmartRecycleBinClassifyRequestDto } from "./dtos/smart-recycle-bin-classify-request.dto";
import {
    SMART_RECYCLE_BIN_CLASSIFICATION_HISTORY_REPOSITORY_INJECT_KEY,
    SmartRecycleBinClassificationHistoryEntity,
} from "./entities/smart-recycle-bin-classification-history.entity";
import { SmartRecycleBinClaimRewardRequestDto } from "./dtos/smart-recycle-bin-claim-reward-request.dto";
import { USER_REPOSITORY_INJECT_KEY, UserEntity } from "@modules/user/entities/user.entity";

@Injectable()
export class SmartRecycleBinService {
    constructor(
        @Inject(PHYSICAL_RECYCLE_BIN_REPOSITORY_INJECT_KEY)
        private physicalRecycleBinRepository: Repository<PhysicalRecycleBinEntity>,
        @Inject(SMART_RECYCLE_BIN_REPOSITORY_INJECT_KEY)
        private smartRecycleBinRepository: Repository<SmartRecycleBinEntity>,
        @Inject(SMART_RECYCLE_BIN_CLASSIFICATION_HISTORY_REPOSITORY_INJECT_KEY)
        private smartRecycleBinClassificationHistoryRepository: Repository<SmartRecycleBinClassificationHistoryEntity>,
        @Inject(USER_REPOSITORY_INJECT_KEY)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    async create(smartRecycleBinCreateRequestDto: SmartRecycleBinCreateRequestDto) {
        const newSmartRecycleBin = await this.smartRecycleBinRepository.save({
            name: smartRecycleBinCreateRequestDto.name,
            locationLatitude: smartRecycleBinCreateRequestDto.location.latitude,
            locationLongitude: smartRecycleBinCreateRequestDto.location.longitude,
        });

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

    async classifyWasteImages(files: Array<Express.Multer.File>) {
        return files[0].filename;
    }

    async classify(smartRecycleBinClassifyRequestDto: SmartRecycleBinClassifyRequestDto) {
        const physicalRecycleBin = await this.physicalRecycleBinRepository.findOne({
            where: {
                embeddedSystemId: smartRecycleBinClassifyRequestDto.embeddedSystemId,
            },
        });

        const newSmartRecycleBinClassificationHistory = await this.smartRecycleBinClassificationHistoryRepository.save({
            physicalRecycleBinId: physicalRecycleBin.id,
            volume: smartRecycleBinClassifyRequestDto.volume,
            isCorrect: smartRecycleBinClassifyRequestDto.wasteType === physicalRecycleBin.wasteType,
        });

        const deltaVolume = Math.abs(smartRecycleBinClassifyRequestDto.volume - physicalRecycleBin.currentVolume);

        physicalRecycleBin.currentVolume = smartRecycleBinClassifyRequestDto.volume;
        await this.physicalRecycleBinRepository.save(physicalRecycleBin);

        if (newSmartRecycleBinClassificationHistory.isCorrect) {
            const claimDataPayload = {
                sub: newSmartRecycleBinClassificationHistory.id,
                greenPoint: Math.round(deltaVolume * 10),
            };

            const token = this.jwtService.sign(claimDataPayload);

            return {
                isCorrect: true,
                token,
            };
        }

        return {
            isCorrect: false,
        };
    }

    async claimReward(smartRecycleBinClaimRewardRequestDto: SmartRecycleBinClaimRewardRequestDto, user: UserEntity) {
        let tokenPayload: Record<string, any>;

        try {
            tokenPayload = this.jwtService.verify(smartRecycleBinClaimRewardRequestDto.token);
        } catch {
            throw new BadRequestException("Mã không hợp lệ");
        }

        const classificationHistory = await this.smartRecycleBinClassificationHistoryRepository.findOne({
            where: {
                id: tokenPayload.sub,
            },
        });

        if (!classificationHistory) throw new BadRequestException("Không tìm thấy lịch sử phân loại rác");
        if (classificationHistory.isClaimed) throw new BadRequestException("Bạn đã tích điểm phần thưởng này rồi");
        if (!classificationHistory.isCorrect) throw new BadRequestException("Phân loại rác không chính xác");

        classificationHistory.isClaimed = true;
        await this.smartRecycleBinClassificationHistoryRepository.save(classificationHistory);

        user.greenPoint += tokenPayload.greenPoint;
        await this.userRepository.save(user);

        return {
            message: "Tích điểm thành công",
        };
    }
}
