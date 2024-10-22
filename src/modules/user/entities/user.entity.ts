import { Column, DataSource, Entity, OneToMany } from "typeorm";
import { Role } from "../constants";
import { AppBaseEntity } from "@database/app-base.entity";
import { SmartRecycleBinCleanHistoryEntity } from "@modules/smart-recycle-bin/entities/smart-recycle-bin-clean-history.entity";
import { SmartRecycleBinClassificationHistoryEntity } from "@modules/smart-recycle-bin/entities/smart-recycle-bin-classification-history.entity";

@Entity()
export class UserEntity extends AppBaseEntity {
    @Column({ length: 255 })
    firstName: string;

    @Column({ length: 255, nullable: true })
    lastName?: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({ length: 255, nullable: true })
    address?: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @OneToMany(() => SmartRecycleBinCleanHistoryEntity, (cleanHistory) => cleanHistory.cleanByUser)
    cleanHistories: SmartRecycleBinCleanHistoryEntity[];

    @OneToMany(() => SmartRecycleBinClassificationHistoryEntity, (cleanHistory) => cleanHistory.classifyByUser)
    classificationHistories: SmartRecycleBinClassificationHistoryEntity[];
}

export const USER_REPOSITORY_INJECT_KEY = "USER_REPOSITORY";

export const userRepository = {
    provide: USER_REPOSITORY_INJECT_KEY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: ["DATA_SOURCE"],
};
