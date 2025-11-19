import { MigrationInterface, QueryRunner } from "typeorm";

export class InfoSeleccion1763563327734 implements MigrationInterface {
    name = 'InfoSeleccion1763563327734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` DROP FOREIGN KEY \`FK_d1fcc91ec76f89cd925c348df42\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` DROP COLUMN \`id_empleado\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` ADD \`id_profesional\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` ADD \`id_auxiliar\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` ADD CONSTRAINT \`FK_53dbc954518295a04ba89d6ea0a\` FOREIGN KEY (\`id_profesional\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` ADD CONSTRAINT \`FK_b7ed235b1e8b8a9bd4e52743473\` FOREIGN KEY (\`id_auxiliar\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lote\` ADD CONSTRAINT \`FK_be9403373c3862601462e3672ac\` FOREIGN KEY (\`id_ciclo\`) REFERENCES \`ciclo\`(\`id_ciclo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lote\` ADD CONSTRAINT \`FK_854448de7460299a8d402708112\` FOREIGN KEY (\`id_frasco_crudo\`) REFERENCES \`control_reenvase_friam_032\`(\`id_control_reenvase\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lote\` DROP FOREIGN KEY \`FK_854448de7460299a8d402708112\``);
        await queryRunner.query(`ALTER TABLE \`lote\` DROP FOREIGN KEY \`FK_be9403373c3862601462e3672ac\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` DROP FOREIGN KEY \`FK_b7ed235b1e8b8a9bd4e52743473\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` DROP FOREIGN KEY \`FK_53dbc954518295a04ba89d6ea0a\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` DROP COLUMN \`id_auxiliar\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` DROP COLUMN \`id_profesional\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` ADD \`id_empleado\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` ADD CONSTRAINT \`FK_d1fcc91ec76f89cd925c348df42\` FOREIGN KEY (\`id_empleado\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
