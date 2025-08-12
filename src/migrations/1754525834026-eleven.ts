import { MigrationInterface, QueryRunner } from "typeorm";

export class Eleven1754525834026 implements MigrationInterface {
    name = 'Eleven1754525834026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`laboratorios\` ADD \`fecha_registro\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`laboratorios\` DROP COLUMN \`fecha_registro\``);
    }

}
