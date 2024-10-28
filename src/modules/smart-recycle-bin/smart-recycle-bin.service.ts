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
import { aiServerRequest } from "@common";
import * as FormData from "form-data";
import { WasteClassification, WasteClassificationMap, WasteType } from "./constants";
import { SmartRecycleBinCheckClaimRewardRequestDto } from "./dtos/smart-recycle-bin-check-claim-reward-request.dto";
import { cameraServerRequest } from "@common/request/camera-server.request";
import { SmartRecycleBinGetRequestDto } from "./dtos/smart-recycle-bin-get-request.dto";
import { SmartRecycleBinCaptureAndClassifyRequestDto } from "./dtos/smart-recycle-bin-capture-and-classify-request.dto";

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

    async get(smartRecycleBinGetRequestDto: SmartRecycleBinGetRequestDto) {
        return this.smartRecycleBinRepository.findOne({
            where: {
                id: smartRecycleBinGetRequestDto.id,
            },
            relations: ["physicalRecycleBins"],
        });
    }

    async getAll() {
        return this.smartRecycleBinRepository.find({
            relations: ["physicalRecycleBins"],
        });
    }

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
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file.buffer, file.originalname);
        });

        const response: any = await aiServerRequest.post("predict", formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        const { predictions } = response;

        const wasteTypePredictionsCount: Record<WasteType, number> = {
            [WasteType.RECYCLABLE]: 0,
            [WasteType.ORGANIC]: 0,
            [WasteType.NON_RECYCLABLE]: 0,
        };

        predictions.forEach((prediction) => {
            Object.values(WasteType).forEach((wasteType) => {
                if (WasteClassification[wasteType].includes(prediction)) wasteTypePredictionsCount[wasteType] += 1;
            });
        });

        let maxWasteType: WasteType = WasteType.RECYCLABLE;
        Object.values(WasteType).forEach((wasteType) => {
            if (wasteTypePredictionsCount[wasteType] > wasteTypePredictionsCount[maxWasteType]) {
                maxWasteType = wasteType;
            }
        });

        return maxWasteType;
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
                smartRecycleBinClassificationHistoryId: newSmartRecycleBinClassificationHistory.id,
                isCorrect: true,
                token,
            };
        }

        return {
            smartRecycleBinClassificationHistoryId: newSmartRecycleBinClassificationHistory.id,
            isCorrect: false,
        };
    }

    async captureAndClassify(smartRecycleBinCaptureAndClassifyRequestDto: SmartRecycleBinCaptureAndClassifyRequestDto) {
        try {
            // Capture image, convert to buffer and send to AI server
            const cameraResponse: any = await cameraServerRequest.get("capture", {
                responseType: "arraybuffer",
                baseURL: smartRecycleBinCaptureAndClassifyRequestDto.cameraUrl,
            });
            const imageBuffer = Buffer.from(cameraResponse, "binary");

            const formData = new FormData();
            formData.append("files", imageBuffer, "image.jpg");

            const serverResponse: any = await aiServerRequest.post("predict", formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });
            const { predictions } = serverResponse;
            const prediction = predictions[0];
            const predictionDisplay = WasteClassificationMap[prediction];

            let wasteTypePrediction: WasteType;
            Object.values(WasteType).forEach((wasteType) => {
                if (WasteClassification[wasteType].includes(prediction)) wasteTypePrediction = wasteType;
            });

            return {
                prediction,
                predictionDisplay,
                wasteTypePrediction,
            };
        } catch (error) {
            console.log(error.response.data);

            throw error;
        }
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
        const savedUser = await this.userRepository.save(user);

        return {
            greenPoint: savedUser.greenPoint,
            message: "Tích điểm thành công",
        };
    }

    async checkClaimReward(smartRecycleBinCheckClaimRewardRequestDto: SmartRecycleBinCheckClaimRewardRequestDto) {
        const classificationHistory = await this.smartRecycleBinClassificationHistoryRepository.findOne({
            where: {
                id: smartRecycleBinCheckClaimRewardRequestDto.smartRecycleBinClassificationHistoryId,
            },
        });

        if (!classificationHistory) throw new BadRequestException("Không tìm thấy lịch sử phân loại rác");
        if (classificationHistory.isClaimed) throw new BadRequestException("Bạn đã tích điểm phần thưởng này rồi");

        return {
            isClaimed: classificationHistory.isClaimed,
        };
    }
}
