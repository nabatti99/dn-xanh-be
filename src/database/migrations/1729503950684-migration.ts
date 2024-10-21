import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729503950684 implements MigrationInterface {
    name = 'Migration1729503950684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "dn-xanh"."user_role_enum" AS ENUM('USER', 'CONTRIBUTOR', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "dn-xanh"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(255) NOT NULL, "last_name" character varying(255), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "role" "dn-xanh"."user_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dn-xanh"."user"`);
        await queryRunner.query(`DROP TYPE "dn-xanh"."user_role_enum"`);
    }

}
