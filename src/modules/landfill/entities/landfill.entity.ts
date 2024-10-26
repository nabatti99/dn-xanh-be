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
    type: LandfillType;

    @Column({
        type: "enum",
        enum: LandfillPollutionLevel,
        default: LandfillPollutionLevel.NORMAL,
    })
    level: LandfillPollutionLevel;

    @Column({ type: "uuid" })
    reportedByUserId: string;

    @ManyToOne(() => UserEntity, (user) => user.reportedLandfills, { onDelete: "SET NULL" })
    @JoinColumn({ name: "reported_by_user_id", referencedColumnName: "id" })
    reportedBy: UserEntity;
}

export const LANDFILL_REPOSITORY_INJECT_KEY = "LANDFILL_REPOSITORY";

export const landfillRepository = {
    provide: LANDFILL_REPOSITORY_INJECT_KEY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(LandfillEntity),
    inject: ["DATA_SOURCE"],
};
