import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1761630591964 implements MigrationInterface {
    name = 'InitialSchema1761630591964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` DROP FOREIGN KEY \`FK_c6ee9e4b6a9e02cbc65a5a5fe72\``);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` CHANGE \`id_visita_domiciliario\` \`id_visita_seguimiento\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` ADD CONSTRAINT \`FK_d3e60ed115cca2214f0ebf02d26\` FOREIGN KEY (\`id_visita_seguimiento\`) REFERENCES \`visita_seguimiento_friam_038\`(\`id_visita_seguimiento\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` DROP FOREIGN KEY \`FK_d3e60ed115cca2214f0ebf02d26\``);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` CHANGE \`id_visita_seguimiento\` \`id_visita_domiciliario\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` ADD CONSTRAINT \`FK_c6ee9e4b6a9e02cbc65a5a5fe72\` FOREIGN KEY (\`id_visita_domiciliario\`) REFERENCES \`visita_seguimiento_friam_038\`(\`id_visita_seguimiento\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
