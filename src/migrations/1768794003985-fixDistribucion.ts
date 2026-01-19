import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDistribucion1768794003985 implements MigrationInterface {
    name = 'FixDistribucion1768794003985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`info_distribucion_leche_procesada\` DROP FOREIGN KEY \`FK_1d8676f46ea7d6d1b362a232187\``);
        await queryRunner.query(`ALTER TABLE \`info_distribucion_leche_procesada\` ADD CONSTRAINT \`FK_1d8676f46ea7d6d1b362a232187\` FOREIGN KEY (\`id_frasco_pasteurizado\`) REFERENCES \`frascos_pasteurizados\`(\`id_frasco_pasteurizado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`info_distribucion_leche_procesada\` DROP FOREIGN KEY \`FK_1d8676f46ea7d6d1b362a232187\``);
        await queryRunner.query(`ALTER TABLE \`info_distribucion_leche_procesada\` ADD CONSTRAINT \`FK_1d8676f46ea7d6d1b362a232187\` FOREIGN KEY (\`id_frasco_pasteurizado\`) REFERENCES \`frascos_recolectados\`(\`id_frascos_recolectados\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
