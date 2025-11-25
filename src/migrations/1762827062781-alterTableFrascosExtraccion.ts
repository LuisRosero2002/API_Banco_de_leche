import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableFrascosExtraccion1762827062781 implements MigrationInterface {
    name = 'AlterTableFrascosExtraccion1762827062781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`extraccion_friam_016\` ADD \`activo\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`frascos_recolectados\` ADD \`activo\` int NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`frascos_recolectados\` DROP COLUMN \`activo\``);
        await queryRunner.query(`ALTER TABLE \`extraccion_friam_016\` DROP COLUMN \`activo\``);
    }

}
