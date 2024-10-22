import { Column, DataSource, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AppBaseEntity } from "@database/app-base.entity";
import { PhysicalRecycleBinStatus, WasteType } from "../constants";
import { SmartRecycleBinEntity } from "./smart-recycle-bin.entity";

@Entity()
export class PhysicalRecycleBinEntity extends AppBaseEntity {
    @Index()
    @Column({ length: 100, unique: true })
    embeddedSystemId: string;

    @Column({ type: "double precision" })
    maxVolume: number;

    @Column({ type: "double precision", default: 0 })
    currentVolume: number;

    @Column({
        type: "enum",
        enum: WasteType,
    })
    wasteType: WasteType;

    @Column({
        type: "enum",
        enum: PhysicalRecycleBinStatus,
        default: PhysicalRecycleBinStatus.NORMAL,
    })
    status: PhysicalRecycleBinStatus;

    @Column({ type: "uuid" })
    smartRecycleBinId: string;

    @ManyToOne(() => SmartRecycleBinEntity, (smartRecycleBin) => smartRecycleBin.physicalRecycleBins, { onDelete: "CASCADE" })
    @JoinColumn({ name: "smart_recycle_bin_id", referencedColumnName: "id" })
    smartRecycleBin: SmartRecycleBinEntity;
}

export const PHYSICAL_RECYCLE_BIN_REPOSITORY_INJECT_KEY = "PHYSICAL_RECYCLE_BIN_REPOSITORY";

export const physicalRecycleBinRepository = {
    provide: PHYSICAL_RECYCLE_BIN_REPOSITORY_INJECT_KEY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PhysicalRecycleBinEntity),
    inject: ["DATA_SOURCE"],
};
