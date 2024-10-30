import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730305627355 implements MigrationInterface {
    name = 'Migration1730305627355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "dn-xanh"."smart_recycle_bin_classification_history_entity_waste_type_enum" AS ENUM('RECYCLABLE', 'ORGANIC', 'NON_RECYCLABLE')`);
        await queryRunner.query(`ALTER TABLE "dn-xanh"."smart_recycle_bin_classification_history_entity" ADD "waste_type" "dn-xanh"."smart_recycle_bin_classification_history_entity_waste_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dn-xanh"."smart_recycle_bin_classification_history_entity" DROP COLUMN "waste_type"`);
        await queryRunner.query(`DROP TYPE "dn-xanh"."smart_recycle_bin_classification_history_entity_waste_type_enum"`);
    }

}
