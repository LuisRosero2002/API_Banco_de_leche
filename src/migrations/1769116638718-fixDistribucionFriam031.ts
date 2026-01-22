import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDistribucionFriam0311769116638718 implements MigrationInterface {
    name = 'FixDistribucionFriam0311769116638718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` DROP FOREIGN KEY \`FK_754f1f6db19a1c1001dff016aba\``);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` CHANGE \`id_responsable\` \`responsable\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` DROP COLUMN \`responsable\``);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` ADD \`responsable\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` DROP COLUMN \`responsable\``);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` ADD \`responsable\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` CHANGE \`responsable\` \`id_responsable\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` ADD CONSTRAINT \`FK_754f1f6db19a1c1001dff016aba\` FOREIGN KEY (\`id_responsable\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
