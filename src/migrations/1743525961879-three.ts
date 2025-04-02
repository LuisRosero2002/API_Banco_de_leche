import { MigrationInterface, QueryRunner } from "typeorm";

export class Three1743525961879 implements MigrationInterface {
    name = 'Three1743525961879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`congelador\` (\`id_congelador\` int NOT NULL AUTO_INCREMENT, \`descripcion\` varchar(255) NOT NULL, PRIMARY KEY (\`id_congelador\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`frascos_recolectados\` (\`id_frascos_recolectados\` int NOT NULL AUTO_INCREMENT, \`volumen\` double NOT NULL, \`fecha_de_extraccion\` date NOT NULL, \`termo\` int NOT NULL, \`gaveta\` int NOT NULL, \`id_congelador\` int NULL, \`id_casa_visita\` int NULL, PRIMARY KEY (\`id_frascos_recolectados\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`casas_visitas\` (\`id_casa_visita\` int NOT NULL AUTO_INCREMENT, \`observacion\` text NULL, \`id_ruta\` int NULL, PRIMARY KEY (\`id_casa_visita\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rutas_recoleccion_friam_011\` (\`id_ruta\` int NOT NULL AUTO_INCREMENT, \`fecha_registro\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`jornada\` text NOT NULL, \`nombre_conductor\` text NOT NULL, \`placa_vehiculo\` varchar(255) NOT NULL, \`kilometraje_inicial\` double NOT NULL, \`kilometraje_final\` double NULL, \`hora_salida\` varchar(255) NOT NULL, \`hora_llegada\` varchar(255) NULL, \`temperatura_llegada\` double NULL, \`temperatura_salida\` double NOT NULL, \`total_visitas\` int NULL, \`volumen_total\` double NULL, \`id_empleado\` int NULL, PRIMARY KEY (\`id_ruta\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`temperatura_casas\` (\`id_temperatura_casas\` int NOT NULL AUTO_INCREMENT, \`numero_casa\` int NOT NULL, \`temperatura\` double NOT NULL, \`id_ruta\` int NULL, PRIMARY KEY (\`id_temperatura_casas\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`entidades\` ADD \`activo\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`frascos_recolectados\` ADD CONSTRAINT \`FK_bc68b3c8350abd5849248455531\` FOREIGN KEY (\`id_congelador\`) REFERENCES \`congelador\`(\`id_congelador\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`frascos_recolectados\` ADD CONSTRAINT \`FK_27fb5a6e6c788fed1d042795569\` FOREIGN KEY (\`id_casa_visita\`) REFERENCES \`casas_visitas\`(\`id_casa_visita\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` ADD CONSTRAINT \`FK_e92ed61c8c8926fdd81cc9cc638\` FOREIGN KEY (\`id_ruta\`) REFERENCES \`rutas_recoleccion_friam_011\`(\`id_ruta\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rutas_recoleccion_friam_011\` ADD CONSTRAINT \`FK_e39f27423ee27ed8f65017fadcb\` FOREIGN KEY (\`id_empleado\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`temperatura_casas\` ADD CONSTRAINT \`FK_bd7e5d898eb8c29998b1ff435ba\` FOREIGN KEY (\`id_ruta\`) REFERENCES \`rutas_recoleccion_friam_011\`(\`id_ruta\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`temperatura_casas\` DROP FOREIGN KEY \`FK_bd7e5d898eb8c29998b1ff435ba\``);
        await queryRunner.query(`ALTER TABLE \`rutas_recoleccion_friam_011\` DROP FOREIGN KEY \`FK_e39f27423ee27ed8f65017fadcb\``);
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` DROP FOREIGN KEY \`FK_e92ed61c8c8926fdd81cc9cc638\``);
        await queryRunner.query(`ALTER TABLE \`frascos_recolectados\` DROP FOREIGN KEY \`FK_27fb5a6e6c788fed1d042795569\``);
        await queryRunner.query(`ALTER TABLE \`frascos_recolectados\` DROP FOREIGN KEY \`FK_bc68b3c8350abd5849248455531\``);
        await queryRunner.query(`ALTER TABLE \`entidades\` DROP COLUMN \`activo\``);
        await queryRunner.query(`DROP TABLE \`temperatura_casas\``);
        await queryRunner.query(`DROP TABLE \`rutas_recoleccion_friam_011\``);
        await queryRunner.query(`DROP TABLE \`casas_visitas\``);
        await queryRunner.query(`DROP TABLE \`frascos_recolectados\``);
        await queryRunner.query(`DROP TABLE \`congelador\``);
    }

}
