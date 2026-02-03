import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDistribucion1770091238479 implements MigrationInterface {
    name = 'FixDistribucion1770091238479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` DROP COLUMN \`identificacion\``);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` ADD \`identificacion\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` DROP COLUMN \`eps\``);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` ADD \`eps\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` ADD CONSTRAINT \`FK_6e4f68b9a271556648854f2a283\` FOREIGN KEY (\`eps\`) REFERENCES \`entidades\`(\`id_entidad\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` DROP FOREIGN KEY \`FK_6e4f68b9a271556648854f2a283\``);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` DROP COLUMN \`eps\``);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` ADD \`eps\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` DROP COLUMN \`identificacion\``);
        await queryRunner.query(`ALTER TABLE \`distribucion_leche_procesada_friam_031\` ADD \`identificacion\` int NULL`);
    }

}
