import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSeleccionClasificacion1770183090297 implements MigrationInterface {
    name = 'FixSeleccionClasificacion1770183090297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`temperatura_casas\` CHANGE \`temperatura\` \`temperatura\` double NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`temperatura_casas\` CHANGE \`temperatura\` \`temperatura\` double NOT NULL`);
    }

}
