import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729507975078 implements MigrationInterface {
    name = 'Migration1729507975078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "dn-xanh"."user_entity_role_enum" AS ENUM('USER', 'CONTRIBUTOR', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "dn-xanh"."user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(255) NOT NULL, "last_name" character varying(255), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "role" "dn-xanh"."user_entity_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dn-xanh"."user_entity"`);
        await queryRunner.query(`DROP TYPE "dn-xanh"."user_entity_role_enum"`);
    }

}
