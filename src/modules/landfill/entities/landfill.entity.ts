import { Column, DataSource, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AppBaseEntity } from "@database/app-base.entity";
import { LandfillPollutionLevel, LandfillType } from "../constants";
import { UserEntity } from "@modules/user/entities/user.entity";

@Entity()
export class LandfillEntity extends AppBaseEntity {
    @Column({ length: 100 })
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "double precision", default: 16.06 })
    locationLatitude: number;

    @Column({ type: "double precision", default: -251.84 })
    locationLongitude: number;

    @Column({
        type: "enum",
        enum: LandfillType,
    })
    LandfillType: LandfillType;

    @Column({
        type: "enum",
        enum: LandfillPollutionLevel,
        default: LandfillPollutionLevel.NORMAL,
    })
    status: LandfillPollutionLevel;

    @Column({ type: "uuid" })
    reportedByUserId: string;

    @ManyToOne(() => UserEntity, (user) => user.reportedLandfills, { onDelete: "SET NULL" })
    @JoinColumn({ name: "reported_by_user_id", referencedColumnName: "id" })
    reportedBy: UserEntity;
}

export const PHYSICAL_RECYCLE_BIN_REPOSITORY_INJECT_KEY = "PHYSICAL_RECYCLE_BIN_REPOSITORY";

export const physicalRecycleBinRepository = {
    provide: PHYSICAL_RECYCLE_BIN_REPOSITORY_INJECT_KEY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PhysicalRecycleBinEntity),
    inject: ["DATA_SOURCE"],
};
