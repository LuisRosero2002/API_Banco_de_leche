import { MigrationInterface, QueryRunner } from "typeorm";

export class FixConformidades1765300267441 implements MigrationInterface {
    name = 'FixConformidades1765300267441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP COLUMN \`muestra_testeadas\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD \`muestras_testeadas\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD \`acidez\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD \`id_lote\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD UNIQUE INDEX \`IDX_54231f185108fd44de4f3e4663\` (\`id_lote\`)`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` CHANGE \`fecha\` \`fecha\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` CHANGE \`envase\` \`envase\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` CHANGE \`suciedad\` \`suciedad\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` CHANGE \`color\` \`color\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` CHANGE \`flavor\` \`flavor\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_54231f185108fd44de4f3e4663\` ON \`conformidades_friam_017\` (\`id_lote\`)`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD CONSTRAINT \`FK_54231f185108fd44de4f3e46634\` FOREIGN KEY (\`id_lote\`) REFERENCES \`lote\`(\`id_lote\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP FOREIGN KEY \`FK_54231f185108fd44de4f3e46634\``);
        await queryRunner.query(`DROP INDEX \`REL_54231f185108fd44de4f3e4663\` ON \`conformidades_friam_017\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` CHANGE \`flavor\` \`flavor\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` CHANGE \`color\` \`color\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` CHANGE \`suciedad\` \`suciedad\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` CHANGE \`envase\` \`envase\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` CHANGE \`fecha\` \`fecha\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP INDEX \`IDX_54231f185108fd44de4f3e4663\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP COLUMN \`id_lote\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP COLUMN \`acidez\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP COLUMN \`muestras_testeadas\``);
        await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD \`muestra_testeadas\` int NOT NULL`);
    }

}
