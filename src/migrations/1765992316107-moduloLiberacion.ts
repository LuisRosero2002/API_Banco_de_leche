import { MigrationInterface, QueryRunner } from "typeorm";

export class ModuloLiberacion1765992316107 implements MigrationInterface {
    name = 'ModuloLiberacion1765992316107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_54231f185108fd44de4f3e4663\` ON \`conformidades_friam_017\``);
        await queryRunner.query(`CREATE TABLE \`entradas_salidas_pasteurizada_friam_013\` (\`id_entradas_salidas\` int NOT NULL AUTO_INCREMENT, \`gaveta\` int NULL, \`fecha_salida\` date NULL, \`id_responsable_entrada\` int NULL, \`id_responsable_salida\` int NULL, \`id_frasco_pasteurizado\` int NULL, UNIQUE INDEX \`REL_baebc68da165469757deab9723\` (\`id_frasco_pasteurizado\`), PRIMARY KEY (\`id_entradas_salidas\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lactario\` (\`id_lactario\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NULL, \`cama\` int NULL, \`volumen_dosificado\` float NULL, \`medico\` varchar(255) NULL, \`dosificador\` varchar(255) NULL, \`id_ingreso_leche\` int NULL, PRIMARY KEY (\`id_lactario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ingreso_leche_pasteurizada_friam_013\` (\`id_ingreso_leche\` int NOT NULL AUTO_INCREMENT, \`fecha_dispensacion\` int NULL, \`tipo\` varchar(255) NULL, \`id_frasco_pasteurizado\` int NULL, \`id_madre_donante\` int NULL, PRIMARY KEY (\`id_ingreso_leche\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`distribucion_leche_procesada_friam_031\` (\`id_distribucion\` int NOT NULL AUTO_INCREMENT, \`responsable\` varchar(255) NULL, \`nombre_beneficiario\` varchar(255) NULL, \`identificacion\` int NULL, \`semanas_gestacion\` int NULL, \`eps\` varchar(255) NULL, PRIMARY KEY (\`id_distribucion\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`info_distribucion_leche_procesada\` (\`id_info_distribucion\` int NOT NULL AUTO_INCREMENT, \`fecha\` date NULL, \`peso\` float NULL, \`volumen_distribuido\` float NULL, \`tipo\` varchar(255) NULL, \`exclusiva\` int NULL, \`id_frasco_pasteurizado\` int NULL, \`id_distribucion\` int NULL, PRIMARY KEY (\`id_info_distribucion\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pasteurizador\` (\`id_pasteurizador\` int NOT NULL AUTO_INCREMENT, \`tiempo\` int NOT NULL, \`frasco_testigo\` float NOT NULL, \`agua\` float NOT NULL, \`muestra\` int NOT NULL, \`id_curva\` int NULL, PRIMARY KEY (\`id_pasteurizador\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`enfriador\` (\`id_enfriador\` int NOT NULL AUTO_INCREMENT, \`tiempo\` int NOT NULL, \`frasco_testigo\` float NOT NULL, \`agua\` int NOT NULL, \`muestra\` int NOT NULL, \`id_curva\` int NULL, PRIMARY KEY (\`id_enfriador\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`curva_de_penetracion\` (\`id_curva\` int NOT NULL AUTO_INCREMENT, \`numero_frascos\` int NOT NULL, \`tipo_frasco\` varchar(100) NOT NULL, \`tipo_termometro\` varchar(100) NOT NULL, \`marca\` varchar(100) NOT NULL, \`certificado\` varchar(100) NOT NULL, \`agua_pasteurizador\` int NOT NULL, \`temperatura_equipo\` float NOT NULL, \`volumen\` float NOT NULL, \`agua_enfriador\` float NOT NULL, \`temperatura_agua\` float NOT NULL, \`fecha\` date NOT NULL, \`promedio_pasteurizador\` float NOT NULL, \`minutos_pasteurizador\` float NOT NULL, \`promedio_enfriador\` float NOT NULL, \`minutos_enfriador\` float NOT NULL, \`id_responsable_one\` int NULL, \`id_responsable_two\` int NULL, PRIMARY KEY (\`id_curva\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`frascos_pasteurizados\` ADD \`activo\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_pasteurizada_friam_013\` ADD CONSTRAINT \`FK_d512bbbb929ea40e285ee5f7a90\` FOREIGN KEY (\`id_responsable_entrada\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_pasteurizada_friam_013\` ADD CONSTRAINT \`FK_ba188097465d0f989fa9db715dd\` FOREIGN KEY (\`id_responsable_salida\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_pasteurizada_friam_013\` ADD CONSTRAINT \`FK_baebc68da165469757deab9723a\` FOREIGN KEY (\`id_frasco_pasteurizado\`) REFERENCES \`frascos_pasteurizados\`(\`id_frasco_pasteurizado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lactario\` ADD CONSTRAINT \`FK_eb874311659aeee21e6b9157adb\` FOREIGN KEY (\`id_ingreso_leche\`) REFERENCES \`ingreso_leche_pasteurizada_friam_013\`(\`id_ingreso_leche\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ingreso_leche_pasteurizada_friam_013\` ADD CONSTRAINT \`FK_19487cf337e6a37d76a6e69e330\` FOREIGN KEY (\`id_frasco_pasteurizado\`) REFERENCES \`frascos_pasteurizados\`(\`id_frasco_pasteurizado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ingreso_leche_pasteurizada_friam_013\` ADD CONSTRAINT \`FK_eb379803a6f351f67498a50638b\` FOREIGN KEY (\`id_madre_donante\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`info_distribucion_leche_procesada\` ADD CONSTRAINT \`FK_1d8676f46ea7d6d1b362a232187\` FOREIGN KEY (\`id_frasco_pasteurizado\`) REFERENCES \`frascos_recolectados\`(\`id_frascos_recolectados\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`info_distribucion_leche_procesada\` ADD CONSTRAINT \`FK_dc3a290f8d599806554ea2e575d\` FOREIGN KEY (\`id_distribucion\`) REFERENCES \`distribucion_leche_procesada_friam_031\`(\`id_distribucion\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pasteurizador\` ADD CONSTRAINT \`FK_b4127ad54544f183581ae688cd8\` FOREIGN KEY (\`id_curva\`) REFERENCES \`curva_de_penetracion\`(\`id_curva\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`enfriador\` ADD CONSTRAINT \`FK_73c34a254810760b309775a0829\` FOREIGN KEY (\`id_curva\`) REFERENCES \`curva_de_penetracion\`(\`id_curva\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`curva_de_penetracion\` ADD CONSTRAINT \`FK_ddbda85ecf29b08dacd05b665b5\` FOREIGN KEY (\`id_responsable_one\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`curva_de_penetracion\` ADD CONSTRAINT \`FK_76455a09bfb6ee988b0932a04f6\` FOREIGN KEY (\`id_responsable_two\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`curva_de_penetracion\` DROP FOREIGN KEY \`FK_76455a09bfb6ee988b0932a04f6\``);
        await queryRunner.query(`ALTER TABLE \`curva_de_penetracion\` DROP FOREIGN KEY \`FK_ddbda85ecf29b08dacd05b665b5\``);
        await queryRunner.query(`ALTER TABLE \`enfriador\` DROP FOREIGN KEY \`FK_73c34a254810760b309775a0829\``);
        await queryRunner.query(`ALTER TABLE \`pasteurizador\` DROP FOREIGN KEY \`FK_b4127ad54544f183581ae688cd8\``);
        await queryRunner.query(`ALTER TABLE \`info_distribucion_leche_procesada\` DROP FOREIGN KEY \`FK_dc3a290f8d599806554ea2e575d\``);
        await queryRunner.query(`ALTER TABLE \`info_distribucion_leche_procesada\` DROP FOREIGN KEY \`FK_1d8676f46ea7d6d1b362a232187\``);
        await queryRunner.query(`ALTER TABLE \`ingreso_leche_pasteurizada_friam_013\` DROP FOREIGN KEY \`FK_eb379803a6f351f67498a50638b\``);
        await queryRunner.query(`ALTER TABLE \`ingreso_leche_pasteurizada_friam_013\` DROP FOREIGN KEY \`FK_19487cf337e6a37d76a6e69e330\``);
        await queryRunner.query(`ALTER TABLE \`lactario\` DROP FOREIGN KEY \`FK_eb874311659aeee21e6b9157adb\``);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_pasteurizada_friam_013\` DROP FOREIGN KEY \`FK_baebc68da165469757deab9723a\``);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_pasteurizada_friam_013\` DROP FOREIGN KEY \`FK_ba188097465d0f989fa9db715dd\``);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_pasteurizada_friam_013\` DROP FOREIGN KEY \`FK_d512bbbb929ea40e285ee5f7a90\``);
        await queryRunner.query(`ALTER TABLE \`frascos_pasteurizados\` DROP COLUMN \`activo\``);
        await queryRunner.query(`DROP TABLE \`curva_de_penetracion\``);
        await queryRunner.query(`DROP TABLE \`enfriador\``);
        await queryRunner.query(`DROP TABLE \`pasteurizador\``);
        await queryRunner.query(`DROP TABLE \`info_distribucion_leche_procesada\``);
        await queryRunner.query(`DROP TABLE \`distribucion_leche_procesada_friam_031\``);
        await queryRunner.query(`DROP TABLE \`ingreso_leche_pasteurizada_friam_013\``);
        await queryRunner.query(`DROP TABLE \`lactario\``);
        await queryRunner.query(`DROP INDEX \`REL_baebc68da165469757deab9723\` ON \`entradas_salidas_pasteurizada_friam_013\``);
        await queryRunner.query(`DROP TABLE \`entradas_salidas_pasteurizada_friam_013\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_54231f185108fd44de4f3e4663\` ON \`conformidades_friam_017\` (\`id_lote\`)`);
    }

}
