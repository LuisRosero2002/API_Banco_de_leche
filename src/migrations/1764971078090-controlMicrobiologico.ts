import { MigrationInterface, QueryRunner } from "typeorm";

export class ControlMicrobiologico1764971078090 implements MigrationInterface {
    name = 'ControlMicrobiologico1764971078090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`info_control_microbiologico\` (\`id_info_control\` int NOT NULL AUTO_INCREMENT, \`fecha_siembre\` datetime NOT NULL, \`primera_lectura\` datetime NOT NULL, \`responsable_siembre\` int NULL, \`responsable_lectura\` int NULL, \`responsable_procesamiento\` int NULL, \`coordinador\` int NULL, PRIMARY KEY (\`id_info_control\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`control_microbiologico_friam_014\` (\`id_control_microbiologico\` int NOT NULL AUTO_INCREMENT, \`fecha\` date NOT NULL, \`coliformes\` int NULL, \`conformidad\` int NULL, \`prueba_confirmatoria\` int NULL, \`liberacion\` int NULL, \`observaciones\` text NULL, \`id_frasco_pasteurizado\` int NULL, \`id_info_control\` int NULL, UNIQUE INDEX \`REL_6bb886bc3be1e52cc3d0febb70\` (\`id_frasco_pasteurizado\`), UNIQUE INDEX \`REL_ffe5da16953ea6eea47eb9896f\` (\`id_info_control\`), PRIMARY KEY (\`id_control_microbiologico\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP COLUMN \`muestras_testeadas\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP COLUMN \`acidez\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP COLUMN \`id_lote\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD \`muestra_testeadas\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_control_microbiologico\` ADD CONSTRAINT \`FK_1fb74e275f2978b7f4af9c1575b\` FOREIGN KEY (\`responsable_siembre\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`info_control_microbiologico\` ADD CONSTRAINT \`FK_83a95d94d5cfa326c5f67e67de8\` FOREIGN KEY (\`responsable_lectura\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`info_control_microbiologico\` ADD CONSTRAINT \`FK_3865a96589f68b00ab03f444da6\` FOREIGN KEY (\`responsable_procesamiento\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`info_control_microbiologico\` ADD CONSTRAINT \`FK_59cebecee450bac1f3e954b4b65\` FOREIGN KEY (\`coordinador\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`control_microbiologico_friam_014\` ADD CONSTRAINT \`FK_6bb886bc3be1e52cc3d0febb707\` FOREIGN KEY (\`id_frasco_pasteurizado\`) REFERENCES \`frascos_pasteurizados\`(\`id_frasco_pasteurizado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`control_microbiologico_friam_014\` ADD CONSTRAINT \`FK_ffe5da16953ea6eea47eb9896f1\` FOREIGN KEY (\`id_info_control\`) REFERENCES \`info_control_microbiologico\`(\`id_info_control\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`control_microbiologico_friam_014\` DROP FOREIGN KEY \`FK_ffe5da16953ea6eea47eb9896f1\``);
        await queryRunner.query(`ALTER TABLE \`control_microbiologico_friam_014\` DROP FOREIGN KEY \`FK_6bb886bc3be1e52cc3d0febb707\``);
        await queryRunner.query(`ALTER TABLE \`info_control_microbiologico\` DROP FOREIGN KEY \`FK_59cebecee450bac1f3e954b4b65\``);
        await queryRunner.query(`ALTER TABLE \`info_control_microbiologico\` DROP FOREIGN KEY \`FK_3865a96589f68b00ab03f444da6\``);
        await queryRunner.query(`ALTER TABLE \`info_control_microbiologico\` DROP FOREIGN KEY \`FK_83a95d94d5cfa326c5f67e67de8\``);
        await queryRunner.query(`ALTER TABLE \`info_control_microbiologico\` DROP FOREIGN KEY \`FK_1fb74e275f2978b7f4af9c1575b\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP COLUMN \`muestra_testeadas\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD \`id_lote\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD \`acidez\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD \`muestras_testeadas\` int NOT NULL`);
        await queryRunner.query(`DROP INDEX \`REL_ffe5da16953ea6eea47eb9896f\` ON \`control_microbiologico_friam_014\``);
        await queryRunner.query(`DROP INDEX \`REL_6bb886bc3be1e52cc3d0febb70\` ON \`control_microbiologico_friam_014\``);
        await queryRunner.query(`DROP TABLE \`control_microbiologico_friam_014\``);
        await queryRunner.query(`DROP TABLE \`info_control_microbiologico\``);
    }

}
