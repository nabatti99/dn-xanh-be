import { Entity, PrimaryGeneratedColumn, Column, DataSource } from "typeorm";
import { Role } from "../constants";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255 })
    firstName: string;

    @Column({ length: 255, nullable: true })
    lastName?: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER,
    })
    role: Role;
}

export const USER_REPOSITORY_INJECT_KEY = "USER_REPOSITORY";

export const userRepository = {
    provide: USER_REPOSITORY_INJECT_KEY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ["DATA_SOURCE"],
};
