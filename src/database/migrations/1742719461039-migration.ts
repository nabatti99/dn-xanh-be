import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742719461039 implements MigrationInterface {
    name = 'Migration1742719461039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "smart_recycle_bin_classification_history_entity" DROP COLUMN "waste_type"`);
        await queryRunner.query(`DROP TYPE "public"."smart_recycle_bin_classification_history_entity_waste_type_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."smart_recycle_bin_classification_history_entity_waste_type_enum" AS ENUM('RECYCLABLE', 'ORGANIC', 'NON_RECYCLABLE')`);
        await queryRunner.query(`ALTER TABLE "smart_recycle_bin_classification_history_entity" ADD "waste_type" "public"."smart_recycle_bin_classification_history_entity_waste_type_enum" NOT NULL`);
    }

}
