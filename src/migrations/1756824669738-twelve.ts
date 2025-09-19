import { MigrationInterface, QueryRunner } from "typeorm";

export class Twelve1756824669738 implements MigrationInterface {
    name = 'Twelve1756824669738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`temperatura_casas\` ADD \`caja\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`temperatura_casas\` DROP COLUMN \`caja\``);
    }

}
