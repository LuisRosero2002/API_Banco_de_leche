import { MigrationInterface, QueryRunner } from "typeorm";

export class Sixteen1759250573385 implements MigrationInterface {
    name = 'Sixteen1759250573385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` ADD \`numero_casa\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` DROP COLUMN \`numero_casa\``);
    }

}
