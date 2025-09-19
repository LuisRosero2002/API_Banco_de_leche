import { MigrationInterface, QueryRunner } from "typeorm";

export class Thirteen1756850839685 implements MigrationInterface {
    name = 'Thirteen1756850839685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`temperaturas_rutas\` (\`id_ruta\` int NOT NULL, \`id_caja\` int NOT NULL, \`temperatura_llegada\` double NOT NULL, \`temperatura_salida\` double NOT NULL, PRIMARY KEY (\`id_ruta\`, \`id_caja\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`madres_donantes_friam_018\` ADD \`activo\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`temperaturas_rutas\` ADD CONSTRAINT \`FK_d7ba444faf1a9246331b6905056\` FOREIGN KEY (\`id_ruta\`) REFERENCES \`rutas_recoleccion_friam_011\`(\`id_ruta\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`temperaturas_rutas\` ADD CONSTRAINT \`FK_d8eed07e09e3e6884b7009e56c7\` FOREIGN KEY (\`id_caja\`) REFERENCES \`temperatura_casas\`(\`id_temperatura_casas\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`temperaturas_rutas\` DROP FOREIGN KEY \`FK_d8eed07e09e3e6884b7009e56c7\``);
        await queryRunner.query(`ALTER TABLE \`temperaturas_rutas\` DROP FOREIGN KEY \`FK_d7ba444faf1a9246331b6905056\``);
        await queryRunner.query(`ALTER TABLE \`madres_donantes_friam_018\` DROP COLUMN \`activo\``);
        await queryRunner.query(`DROP TABLE \`temperaturas_rutas\``);
    }

}
