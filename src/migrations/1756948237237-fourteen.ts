import { MigrationInterface, QueryRunner } from "typeorm";

export class Fourteen1756948237237 implements MigrationInterface {
    name = 'Fourteen1756948237237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`temperaturas_rutas\` (\`id_temperatura_ruta\` int NOT NULL AUTO_INCREMENT, \`numero_caja\` int NOT NULL, \`temperatura_salida\` double NOT NULL, \`temperatura_llegada\` double NOT NULL, \`id_ruta\` int NULL, PRIMARY KEY (\`id_temperatura_ruta\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`temperaturas_rutas\` ADD CONSTRAINT \`FK_d7ba444faf1a9246331b6905056\` FOREIGN KEY (\`id_ruta\`) REFERENCES \`rutas_recoleccion_friam_011\`(\`id_ruta\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`temperaturas_rutas\` DROP FOREIGN KEY \`FK_d7ba444faf1a9246331b6905056\``);
        await queryRunner.query(`DROP TABLE \`temperaturas_rutas\``);
    }

}
