import { MigrationInterface, QueryRunner } from "typeorm";

export class FixFrnut0131769531753864 implements MigrationInterface {
    name = 'FixFrnut0131769531753864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ingreso_leche_pasteurizada_friam_013\` DROP COLUMN \`fecha_dispensacion\``);
        await queryRunner.query(`ALTER TABLE \`ingreso_leche_pasteurizada_friam_013\` ADD \`fecha_dispensacion\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ingreso_leche_pasteurizada_friam_013\` DROP COLUMN \`fecha_dispensacion\``);
        await queryRunner.query(`ALTER TABLE \`ingreso_leche_pasteurizada_friam_013\` ADD \`fecha_dispensacion\` int NULL`);
    }

}
