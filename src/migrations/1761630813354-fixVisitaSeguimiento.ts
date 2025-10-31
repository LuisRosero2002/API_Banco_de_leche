import { MigrationInterface, QueryRunner } from "typeorm";

export class FixVisitaSeguimiento1761630813354 implements MigrationInterface {
    name = 'FixVisitaSeguimiento1761630813354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` DROP FOREIGN KEY \`FK_ce0da0b464f634343ce70db1991\``);
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` ADD \`id_madre_donante\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` ADD CONSTRAINT \`FK_f0a8b4d13bc800fc1cd337269ca\` FOREIGN KEY (\`id_madre_donante\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` DROP FOREIGN KEY \`FK_f0a8b4d13bc800fc1cd337269ca\``);
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` DROP COLUMN \`id_madre_donante\``);
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` ADD CONSTRAINT \`FK_ce0da0b464f634343ce70db1991\` FOREIGN KEY (\`id_visita_seguimiento\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
