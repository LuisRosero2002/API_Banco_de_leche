import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRespuestasSeguimiento1761631146764 implements MigrationInterface {
    name = 'FixRespuestasSeguimiento1761631146764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` CHANGE \`respuesta\` \`respuesta\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` CHANGE \`respuesta\` \`respuesta\` int NOT NULL`);
    }

}
