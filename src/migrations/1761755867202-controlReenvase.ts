import { MigrationInterface, QueryRunner } from "typeorm";

export class ControlReenvase1761755867202 implements MigrationInterface {
    name = 'ControlReenvase1761755867202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`frascos_pasteurizados\` (\`id_frasco_pasteurizado\` int NOT NULL AUTO_INCREMENT, \`volumen\` float NULL, \`id_control_reenvase\` int NULL, PRIMARY KEY (\`id_frasco_pasteurizado\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`control_reenvase_friam_032\` (\`id_control_reenvase\` int NOT NULL AUTO_INCREMENT, \`fecha\` date NOT NULL, \`frasco_crudo\` float NOT NULL, \`id_madre_donante\` int NULL, \`id_empleado\` int NULL, PRIMARY KEY (\`id_control_reenvase\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`frascos_pasteurizados\` ADD CONSTRAINT \`FK_12723c20293f3d0479d83ef1d50\` FOREIGN KEY (\`id_control_reenvase\`) REFERENCES \`control_reenvase_friam_032\`(\`id_control_reenvase\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` ADD CONSTRAINT \`FK_19f958d2864a5ff8b7144788b38\` FOREIGN KEY (\`id_madre_donante\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` ADD CONSTRAINT \`FK_ee085485bf76101b4d257df047f\` FOREIGN KEY (\`id_empleado\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` DROP FOREIGN KEY \`FK_ee085485bf76101b4d257df047f\``);
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` DROP FOREIGN KEY \`FK_19f958d2864a5ff8b7144788b38\``);
        await queryRunner.query(`ALTER TABLE \`frascos_pasteurizados\` DROP FOREIGN KEY \`FK_12723c20293f3d0479d83ef1d50\``);
        await queryRunner.query(`DROP TABLE \`control_reenvase_friam_032\``);
        await queryRunner.query(`DROP TABLE \`frascos_pasteurizados\``);
    }

}
