import { Column, DataSource, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AppBaseEntity } from "@database/app-base.entity";
import { UserEntity } from "@modules/user/entities/user.entity";
import { PhysicalRecycleBinEntity } from "./physical-recycle-bin.entity";

@Entity()
export class SmartRecycleBinClassificationHistoryEntity extends AppBaseEntity {
    @Column({ type: "double precision" })
    volume: number;

    @Column({ type: "uuid" })
    physicalRecycleBinId: string;

    @Column({ type: "uuid" })
    classifyByUserId: string;

    @ManyToOne(() => PhysicalRecycleBinEntity, (physicalRecycleBin) => physicalRecycleBin.classificationHistories, { onDelete: "SET NULL" })
    @JoinColumn({ name: "physical_recycle_bin_id", referencedColumnName: "id" })
    physicalRecycleBin: PhysicalRecycleBinEntity;

    @ManyToOne(() => UserEntity, (user) => user.classificationHistories, { onDelete: "CASCADE" })
    @JoinColumn({ name: "classify_by_user_id", referencedColumnName: "id" })
    classifyByUser: UserEntity;
}

export const SMART_RECYCLE_BIN_CLASSIFICATION_HISTORY_REPOSITORY_INJECT_KEY = "SMART_RECYCLE_BIN_CLASSIFICATION_HISTORY_REPOSITORY";

export const smartRecycleBinClassificationHistoryRepository = {
    provide: SMART_RECYCLE_BIN_CLASSIFICATION_HISTORY_REPOSITORY_INJECT_KEY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SmartRecycleBinClassificationHistoryEntity),
    inject: ["DATA_SOURCE"],
};
