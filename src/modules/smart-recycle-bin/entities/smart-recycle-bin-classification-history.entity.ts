import { Column, DataSource, Entity, JoinColumn, ManyToOne } from "typeorm";
import { SmartRecycleBinEntity } from "./smart-recycle-bin.entity";
import { AppBaseEntity } from "@database/app-base.entity";
import { UserEntity } from "@modules/user/entities/user.entity";

@Entity()
export class SmartRecycleBinClassificationHistoryEntity extends AppBaseEntity {
    @Column({ type: "double precision" })
    volume: number;

    @Column({ type: "uuid" })
    smartRecycleBinId: string;

    @Column({ type: "uuid" })
    classifyByUserId: string;

    @ManyToOne(() => SmartRecycleBinEntity, (smartRecycleBin) => smartRecycleBin.classificationHistories, { onDelete: "CASCADE" })
    @JoinColumn({ name: "smart_recycle_bin_id", referencedColumnName: "id" })
    smartRecycleBin: SmartRecycleBinEntity;

    @ManyToOne(() => UserEntity, (user) => user.classificationHistories, { onDelete: "SET NULL" })
    @JoinColumn({ name: "classify_by_user_id", referencedColumnName: "id" })
    classifyByUser: UserEntity;
}

export const SMART_RECYCLE_BIN_CLASSIFICATION_HISTORY_REPOSITORY_INJECT_KEY = "SMART_RECYCLE_BIN_CLASSIFICATION_HISTORY_REPOSITORY";

export const smartRecycleBinClassificationHistoryRepository = {
    provide: SMART_RECYCLE_BIN_CLASSIFICATION_HISTORY_REPOSITORY_INJECT_KEY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SmartRecycleBinClassificationHistoryEntity),
    inject: ["DATA_SOURCE"],
};
