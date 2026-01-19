import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix0311768515594745 implements MigrationInterface {
    name = 'Fix0311768515594745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`info_distribucion_leche_procesada\` DROP COLUMN \`peso\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`info_distribucion_leche_procesada\` ADD \`peso\` float NULL`);
    }

}
