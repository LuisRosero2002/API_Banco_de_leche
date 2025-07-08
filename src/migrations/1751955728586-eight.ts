import { MigrationInterface, QueryRunner } from "typeorm";

export class Eight1751955728586 implements MigrationInterface {
    name = 'Eight1751955728586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`madres_donantes_friam_018\` ADD \`firma_acompañante\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`madres_donantes_friam_018\` DROP COLUMN \`firma_acompañante\``);
    }

}
