import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729593989227 implements MigrationInterface {
    name = 'Migration1729593989227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "dn-xanh"."physical_recycle_bin_entity_waste_type_enum" AS ENUM('RECYCLE', 'ORGANIC', 'INORGANIC')`);
        await queryRunner.query(`CREATE TYPE "dn-xanh"."physical_recycle_bin_entity_status_enum" AS ENUM('NORMAL', 'FULL')`);
        await queryRunner.query(`CREATE TABLE "dn-xanh"."physical_recycle_bin_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "embedded_system_id" character varying(100) NOT NULL, "max_volume" double precision NOT NULL, "current_volume" double precision NOT NULL DEFAULT '0', "waste_type" "dn-xanh"."physical_recycle_bin_entity_waste_type_enum" NOT NULL, "status" "dn-xanh"."physical_recycle_bin_entity_status_enum" NOT NULL DEFAULT 'NORMAL', "smart_recycle_bin_id" uuid NOT NULL, CONSTRAINT "UQ_8c11dd5396a9dc1f731112f796a" UNIQUE ("embedded_system_id"), CONSTRAINT "PK_dda478b4786a5c57034bce1a565" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8c11dd5396a9dc1f731112f796" ON "dn-xanh"."physical_recycle_bin_entity" ("embedded_system_id") `);
        await queryRunner.query(`CREATE TABLE "dn-xanh"."smart_recycle_bin_classification_history_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "volume" double precision NOT NULL, "smart_recycle_bin_id" uuid NOT NULL, "classify_by_user_id" uuid NOT NULL, CONSTRAINT "PK_49597e3c431377f003f3ba439df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "dn-xanh"."smart_recycle_bin_entity_status_enum" AS ENUM('HEALTHY', 'IN_CONSTRUCTION', 'FIXING', 'LOST_CONNECTION', 'ERROR', 'NO_LONGER_NEEDED')`);
        await queryRunner.query(`CREATE TABLE "dn-xanh"."smart_recycle_bin_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "location_latitude" double precision NOT NULL DEFAULT '16.06', "location_longitude" double precision NOT NULL DEFAULT '-251.84', "status" "dn-xanh"."smart_recycle_bin_entity_status_enum" NOT NULL DEFAULT 'IN_CONSTRUCTION', CONSTRAINT "PK_4e98ea1e32b843de34420ca1302" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dn-xanh"."smart_recycle_bin_clean_history_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "smart_recycle_bin_id" uuid NOT NULL, "clean_by_user_id" uuid NOT NULL, CONSTRAINT "PK_a0dcf1232f54da298ce31d98473" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "dn-xanh"."user_entity_role_enum" AS ENUM('USER', 'CONTRIBUTOR', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "dn-xanh"."user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "first_name" character varying(255) NOT NULL, "last_name" character varying(255), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "address" character varying(255), "role" "dn-xanh"."user_entity_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dn-xanh"."physical_recycle_bin_entity" ADD CONSTRAINT "FK_b2da71fa073fdafc11b07087a05" FOREIGN KEY ("smart_recycle_bin_id") REFERENCES "dn-xanh"."smart_recycle_bin_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dn-xanh"."smart_recycle_bin_classification_history_entity" ADD CONSTRAINT "FK_4225667b822d5f703750ce193d3" FOREIGN KEY ("smart_recycle_bin_id") REFERENCES "dn-xanh"."smart_recycle_bin_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dn-xanh"."smart_recycle_bin_classification_history_entity" ADD CONSTRAINT "FK_6ca82d8a8c6041dd6c017bc85fd" FOREIGN KEY ("classify_by_user_id") REFERENCES "dn-xanh"."user_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dn-xanh"."smart_recycle_bin_clean_history_entity" ADD CONSTRAINT "FK_cdf0403096bf32280e39550ae95" FOREIGN KEY ("smart_recycle_bin_id") REFERENCES "dn-xanh"."smart_recycle_bin_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dn-xanh"."smart_recycle_bin_clean_history_entity" ADD CONSTRAINT "FK_26a97d5116087df4ce47badf66d" FOREIGN KEY ("clean_by_user_id") REFERENCES "dn-xanh"."user_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dn-xanh"."smart_recycle_bin_clean_history_entity" DROP CONSTRAINT "FK_26a97d5116087df4ce47badf66d"`);
        await queryRunner.query(`ALTER TABLE "dn-xanh"."smart_recycle_bin_clean_history_entity" DROP CONSTRAINT "FK_cdf0403096bf32280e39550ae95"`);
        await queryRunner.query(`ALTER TABLE "dn-xanh"."smart_recycle_bin_classification_history_entity" DROP CONSTRAINT "FK_6ca82d8a8c6041dd6c017bc85fd"`);
        await queryRunner.query(`ALTER TABLE "dn-xanh"."smart_recycle_bin_classification_history_entity" DROP CONSTRAINT "FK_4225667b822d5f703750ce193d3"`);
        await queryRunner.query(`ALTER TABLE "dn-xanh"."physical_recycle_bin_entity" DROP CONSTRAINT "FK_b2da71fa073fdafc11b07087a05"`);
        await queryRunner.query(`DROP TABLE "dn-xanh"."user_entity"`);
        await queryRunner.query(`DROP TYPE "dn-xanh"."user_entity_role_enum"`);
        await queryRunner.query(`DROP TABLE "dn-xanh"."smart_recycle_bin_clean_history_entity"`);
        await queryRunner.query(`DROP TABLE "dn-xanh"."smart_recycle_bin_entity"`);
        await queryRunner.query(`DROP TYPE "dn-xanh"."smart_recycle_bin_entity_status_enum"`);
        await queryRunner.query(`DROP TABLE "dn-xanh"."smart_recycle_bin_classification_history_entity"`);
        await queryRunner.query(`DROP INDEX "dn-xanh"."IDX_8c11dd5396a9dc1f731112f796"`);
        await queryRunner.query(`DROP TABLE "dn-xanh"."physical_recycle_bin_entity"`);
        await queryRunner.query(`DROP TYPE "dn-xanh"."physical_recycle_bin_entity_status_enum"`);
        await queryRunner.query(`DROP TYPE "dn-xanh"."physical_recycle_bin_entity_waste_type_enum"`);
    }

}
