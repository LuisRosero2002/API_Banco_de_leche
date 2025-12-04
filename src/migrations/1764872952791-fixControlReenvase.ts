import { MigrationInterface, QueryRunner } from "typeorm";

export class FixControlReenvase1764872952791 implements MigrationInterface {
    name = 'FixControlReenvase1764872952791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS \`conformidades_friam_017\` (\`id_conformidades\` int NOT NULL AUTO_INCREMENT, \`fecha\` date NOT NULL, \`envase\` int NOT NULL, \`suciedad\` int NOT NULL, \`color\` int NOT NULL, \`flavor\` int NOT NULL, \`muestra_testeadas\` int NOT NULL, \`muestras_reprobadas\` int NOT NULL, PRIMARY KEY (\`id_conformidades\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` DROP COLUMN \`id_frasco_crudo\``);
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` ADD \`id_frasco_crudo\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` ADD UNIQUE INDEX \`IDX_6db83122ee145e19a2b8886af4\` (\`id_frasco_crudo\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6db83122ee145e19a2b8886af4\` ON \`control_reenvase_friam_032\` (\`id_frasco_crudo\`)`);
        await queryRunner.query(`ALTER TABLE \`lote\` ADD CONSTRAINT \`FK_be9403373c3862601462e3672ac\` FOREIGN KEY (\`id_ciclo\`) REFERENCES \`ciclo\`(\`id_ciclo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` ADD CONSTRAINT \`FK_6db83122ee145e19a2b8886af4e\` FOREIGN KEY (\`id_frasco_crudo\`) REFERENCES \`entradas_salidas_friam_012\`(\`id_entradas_salidas\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` DROP FOREIGN KEY \`FK_6db83122ee145e19a2b8886af4e\``);
        await queryRunner.query(`ALTER TABLE \`lote\` DROP FOREIGN KEY \`FK_be9403373c3862601462e3672ac\``);
        await queryRunner.query(`DROP INDEX \`REL_6db83122ee145e19a2b8886af4\` ON \`control_reenvase_friam_032\``);
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` DROP INDEX \`IDX_6db83122ee145e19a2b8886af4\``);
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` DROP COLUMN \`id_frasco_crudo\``);
        await queryRunner.query(`ALTER TABLE \`control_reenvase_friam_032\` ADD \`id_frasco_crudo\` float NOT NULL`);
        await queryRunner.query(`DROP TABLE \`conformidades_friam_017\``);
    }

}
