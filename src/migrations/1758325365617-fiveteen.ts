import { MigrationInterface, QueryRunner } from "typeorm";

export class Fiveteen1758325365617 implements MigrationInterface {
    name = 'Fiveteen1758325365617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`datos_visita_seguimiento\` (\`id_datos_visita\` int NOT NULL AUTO_INCREMENT, \`observaciones\` text NULL, \`recomendaciones\` text NULL, \`firma_usuario\` text NULL, \`firma_evaluador\` text NULL, \`id_visita_seguimiento\` int NULL, UNIQUE INDEX \`REL_78ba710db8b09bd0447a88d12c\` (\`id_visita_seguimiento\`), PRIMARY KEY (\`id_datos_visita\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`preguntas_friam_038\` (\`id_pregunta\` int NOT NULL AUTO_INCREMENT, \`pregunta\` text NOT NULL, PRIMARY KEY (\`id_pregunta\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`respuestas_friam_038\` (\`id_respuesta\` int NOT NULL AUTO_INCREMENT, \`respuesta\` text NOT NULL, \`id_pregunta\` int NULL, \`id_visita_domiciliario\` int NULL, PRIMARY KEY (\`id_respuesta\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`visita_seguimiento_friam_038\` (\`id_visita_seguimiento\` int NOT NULL AUTO_INCREMENT, \`fecha\` date NOT NULL, PRIMARY KEY (\`id_visita_seguimiento\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`datos_visita_seguimiento\` ADD CONSTRAINT \`FK_78ba710db8b09bd0447a88d12cc\` FOREIGN KEY (\`id_visita_seguimiento\`) REFERENCES \`visita_seguimiento_friam_038\`(\`id_visita_seguimiento\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` ADD CONSTRAINT \`FK_df92ff2e4cd72657372adb268df\` FOREIGN KEY (\`id_pregunta\`) REFERENCES \`preguntas_friam_038\`(\`id_pregunta\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` ADD CONSTRAINT \`FK_c6ee9e4b6a9e02cbc65a5a5fe72\` FOREIGN KEY (\`id_visita_domiciliario\`) REFERENCES \`visita_seguimiento_friam_038\`(\`id_visita_seguimiento\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` ADD CONSTRAINT \`FK_ce0da0b464f634343ce70db1991\` FOREIGN KEY (\`id_visita_seguimiento\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`visita_seguimiento_friam_038\` DROP FOREIGN KEY \`FK_ce0da0b464f634343ce70db1991\``);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` DROP FOREIGN KEY \`FK_c6ee9e4b6a9e02cbc65a5a5fe72\``);
        await queryRunner.query(`ALTER TABLE \`respuestas_friam_038\` DROP FOREIGN KEY \`FK_df92ff2e4cd72657372adb268df\``);
        await queryRunner.query(`ALTER TABLE \`datos_visita_seguimiento\` DROP FOREIGN KEY \`FK_78ba710db8b09bd0447a88d12cc\``);
        await queryRunner.query(`DROP TABLE \`visita_seguimiento_friam_038\``);
        await queryRunner.query(`DROP TABLE \`respuestas_friam_038\``);
        await queryRunner.query(`DROP TABLE \`preguntas_friam_038\``);
        await queryRunner.query(`DROP INDEX \`REL_78ba710db8b09bd0447a88d12c\` ON \`datos_visita_seguimiento\``);
        await queryRunner.query(`DROP TABLE \`datos_visita_seguimiento\``);
    }

}
