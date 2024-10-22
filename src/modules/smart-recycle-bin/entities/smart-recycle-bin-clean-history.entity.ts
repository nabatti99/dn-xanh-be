import { Column, DataSource, Entity, JoinColumn, ManyToOne } from "typeorm";
import { SmartRecycleBinEntity } from "./smart-recycle-bin.entity";
import { AppBaseEntity } from "@database/app-base.entity";
import { UserEntity } from "@modules/user/entities/user.entity";

@Entity()
export class SmartRecycleBinCleanHistoryEntity extends AppBaseEntity {
    @Column({ type: "uuid" })
    smartRecycleBinId: string;

    @Column({ type: "uuid" })
    cleanByUserId: string;

    @ManyToOne(() => SmartRecycleBinEntity, (smartRecycleBin) => smartRecycleBin.cleanHistories, { onDelete: "CASCADE" })
    @JoinColumn({ name: "smart_recycle_bin_id", referencedColumnName: "id" })
    smartRecycleBin: SmartRecycleBinEntity;

    @ManyToOne(() => UserEntity, (user) => user.cleanHistories, { onDelete: "SET NULL" })
    @JoinColumn({ name: "clean_by_user_id", referencedColumnName: "id" })
    cleanByUser: UserEntity;
}

export const SMART_RECYCLE_BIN_CLEAN_HISTORY_REPOSITORY_INJECT_KEY = "SMART_RECYCLE_BIN_CLEAN_HISTORY_REPOSITORY";

export const smartRecycleBinCleanHistoryRepository = {
    provide: SMART_RECYCLE_BIN_CLEAN_HISTORY_REPOSITORY_INJECT_KEY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SmartRecycleBinCleanHistoryEntity),
    inject: ["DATA_SOURCE"],
};
