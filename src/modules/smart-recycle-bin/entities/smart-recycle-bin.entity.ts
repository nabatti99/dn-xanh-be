import { Column, DataSource, Entity, OneToMany } from "typeorm";
import { SmartRecycleBinStatus } from "../constants";
import { AppBaseEntity } from "@database/app-base.entity";
import { SmartRecycleBinCleanHistoryEntity } from "./smart-recycle-bin-clean-history.entity";
import { PhysicalRecycleBinEntity } from "./physical-recycle-bin.entity";
import { SmartRecycleBinClassificationHistoryEntity } from "./smart-recycle-bin-classification-history.entity";

@Entity()
export class SmartRecycleBinEntity extends AppBaseEntity {
    @Column({ type: "double precision", default: 16.06 })
    locationLatitude: number;

    @Column({ type: "double precision", default: -251.84 })
    locationLongitude: number;

    @Column({
        type: "enum",
        enum: SmartRecycleBinStatus,
        default: SmartRecycleBinStatus.IN_CONSTRUCTION,
    })
    status: SmartRecycleBinStatus;

    @OneToMany(() => PhysicalRecycleBinEntity, (cleanHistory) => cleanHistory.smartRecycleBin)
    physicalRecycleBins: PhysicalRecycleBinEntity[];

    @OneToMany(() => SmartRecycleBinCleanHistoryEntity, (cleanHistory) => cleanHistory.smartRecycleBin)
    cleanHistories: SmartRecycleBinCleanHistoryEntity[];

    @OneToMany(() => SmartRecycleBinClassificationHistoryEntity, (cleanHistory) => cleanHistory.smartRecycleBin)
    classificationHistories: SmartRecycleBinClassificationHistoryEntity[];
}

export const SMART_RECYCLE_BIN_REPOSITORY_INJECT_KEY = "SMART_RECYCLE_BIN_REPOSITORY";

export const smartRecycleBinRepository = {
    provide: SMART_RECYCLE_BIN_REPOSITORY_INJECT_KEY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SmartRecycleBinEntity),
    inject: ["DATA_SOURCE"],
};
