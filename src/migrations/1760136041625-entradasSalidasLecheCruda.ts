import { MigrationInterface, QueryRunner } from "typeorm";

export class EntradasSalidasLecheCruda1760136041625 implements MigrationInterface {
    name = 'EntradasSalidasLecheCruda1760136041625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_friam_012\` ADD \`id_extraccion\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_friam_012\` ADD \`id_frasco_recolectado\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_friam_012\` ADD CONSTRAINT \`FK_bdb83d381cf5c143c422380753a\` FOREIGN KEY (\`id_extraccion\`) REFERENCES \`extraccion_friam_016\`(\`id_extraccion\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_friam_012\` ADD CONSTRAINT \`FK_751fa147d0efdb6d2179c4f202b\` FOREIGN KEY (\`id_frasco_recolectado\`) REFERENCES \`frascos_recolectados\`(\`id_frascos_recolectados\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_friam_012\` DROP FOREIGN KEY \`FK_751fa147d0efdb6d2179c4f202b\``);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_friam_012\` DROP FOREIGN KEY \`FK_bdb83d381cf5c143c422380753a\``);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_friam_012\` DROP COLUMN \`id_frasco_recolectado\``);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_friam_012\` DROP COLUMN \`id_extraccion\``);
    }

}
