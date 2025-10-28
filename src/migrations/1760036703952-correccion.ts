import { MigrationInterface, QueryRunner } from "typeorm";

export class Correccion1760036703952 implements MigrationInterface {
    name = 'Correccion1760036703952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` CHANGE \`id_visita_domiciliario\` \`id_visita_seguimiento\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` DROP COLUMN \`numero_casa\``);
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` ADD \`id_madre_donante\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` ADD CONSTRAINT \`FK_d3e60ed115cca2214f0ebf02d26\` FOREIGN KEY (\`id_visita_seguimiento\`) REFERENCES \`visita_seguimiento_friam_038\`(\`id_visita_seguimiento\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` ADD CONSTRAINT \`FK_f0a8b4d13bc800fc1cd337269ca\` FOREIGN KEY (\`id_madre_donante\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` DROP FOREIGN KEY \`FK_f0a8b4d13bc800fc1cd337269ca\``);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` DROP FOREIGN KEY \`FK_d3e60ed115cca2214f0ebf02d26\``);
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` DROP COLUMN \`id_madre_donante\``);
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` ADD \`numero_casa\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` CHANGE \`id_visita_seguimiento\` \`id_visita_domiciliario\` int NULL`);
    }

}
