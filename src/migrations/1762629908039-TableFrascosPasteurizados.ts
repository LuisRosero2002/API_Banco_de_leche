import { MigrationInterface, QueryRunner } from "typeorm";

export class TableFrascosPasteurizados1762629908039 implements MigrationInterface {
    name = 'TableFrascosPasteurizados1762629908039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`frascos_pasteurizados\` ADD \`numero_frasco\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`frascos_pasteurizados\` ADD \`observaciones\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`frascos_pasteurizados\` DROP COLUMN \`observaciones\``);
        await queryRunner.query(`ALTER TABLE \`frascos_pasteurizados\` DROP COLUMN \`numero_frasco\``);
    }

}
