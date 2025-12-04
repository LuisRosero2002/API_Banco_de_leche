import { MigrationInterface, QueryRunner } from "typeorm";

export class TempPasteurizador1764099555816 implements MigrationInterface {
    name = 'TempPasteurizador1764099555816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DROP INDEX \`REL_be9403373c3862601462e3672a\` ON \`lote\``);
        await queryRunner.query(`CREATE TABLE \`enfriamiento_temperatura\` (\`id_enfriamiento\` int NOT NULL AUTO_INCREMENT, \`minuto\` varchar(255) NOT NULL, \`valor\` float NOT NULL, \`id_temperatura_pasteurizador\` int NULL, UNIQUE INDEX \`REL_6ea2f63956e51c6036aee2a7ab\` (\`id_temperatura_pasteurizador\`), PRIMARY KEY (\`id_enfriamiento\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`calentamiento_pasteurizador\` (\`id_calentamiento\` int NOT NULL AUTO_INCREMENT, \`minuto\` varchar(255) NOT NULL, \`valor\` float NOT NULL, \`id_temperatura_pasteurizador\` int NULL, UNIQUE INDEX \`REL_d8aff0479e126c3cf586dd6fcd\` (\`id_temperatura_pasteurizador\`), PRIMARY KEY (\`id_calentamiento\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`temperatura_pasteurizador_friam_036\` (\`id_temperatura_pasteurizador\` int NOT NULL AUTO_INCREMENT, \`fecha\` date NOT NULL, \`hora_inicio\` varchar(255) NOT NULL, \`hora_finalizacio\` varchar(255) NOT NULL, \`observaciones\` text NULL, \`id_lote\` int NULL, \`id_ciclo\` int NULL, \`responsable\` int NULL, UNIQUE INDEX \`REL_0de668ad0da663cec6eb30c852\` (\`id_lote\`), UNIQUE INDEX \`REL_1338dc199f8fd7947f061123e1\` (\`id_ciclo\`), PRIMARY KEY (\`id_temperatura_pasteurizador\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`enfriamiento_temperatura\` ADD CONSTRAINT \`FK_6ea2f63956e51c6036aee2a7abc\` FOREIGN KEY (\`id_temperatura_pasteurizador\`) REFERENCES \`temperatura_pasteurizador_friam_036\`(\`id_temperatura_pasteurizador\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calentamiento_pasteurizador\` ADD CONSTRAINT \`FK_d8aff0479e126c3cf586dd6fcd8\` FOREIGN KEY (\`id_temperatura_pasteurizador\`) REFERENCES \`temperatura_pasteurizador_friam_036\`(\`id_temperatura_pasteurizador\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`temperatura_pasteurizador_friam_036\` ADD CONSTRAINT \`FK_0de668ad0da663cec6eb30c8529\` FOREIGN KEY (\`id_lote\`) REFERENCES \`lote\`(\`id_lote\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`temperatura_pasteurizador_friam_036\` ADD CONSTRAINT \`FK_1338dc199f8fd7947f061123e1e\` FOREIGN KEY (\`id_ciclo\`) REFERENCES \`ciclo\`(\`id_ciclo\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`temperatura_pasteurizador_friam_036\` ADD CONSTRAINT \`FK_20daed2bc5d5c569c50f7810b62\` FOREIGN KEY (\`responsable\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`temperatura_pasteurizador_friam_036\` DROP FOREIGN KEY \`FK_20daed2bc5d5c569c50f7810b62\``);
        await queryRunner.query(`ALTER TABLE \`temperatura_pasteurizador_friam_036\` DROP FOREIGN KEY \`FK_1338dc199f8fd7947f061123e1e\``);
        await queryRunner.query(`ALTER TABLE \`temperatura_pasteurizador_friam_036\` DROP FOREIGN KEY \`FK_0de668ad0da663cec6eb30c8529\``);
        await queryRunner.query(`ALTER TABLE \`calentamiento_pasteurizador\` DROP FOREIGN KEY \`FK_d8aff0479e126c3cf586dd6fcd8\``);
        await queryRunner.query(`ALTER TABLE \`enfriamiento_temperatura\` DROP FOREIGN KEY \`FK_6ea2f63956e51c6036aee2a7abc\``);
        await queryRunner.query(`DROP INDEX \`REL_1338dc199f8fd7947f061123e1\` ON \`temperatura_pasteurizador_friam_036\``);
        await queryRunner.query(`DROP INDEX \`REL_0de668ad0da663cec6eb30c852\` ON \`temperatura_pasteurizador_friam_036\``);
        await queryRunner.query(`DROP TABLE \`temperatura_pasteurizador_friam_036\``);
        await queryRunner.query(`DROP INDEX \`REL_d8aff0479e126c3cf586dd6fcd\` ON \`calentamiento_pasteurizador\``);
        await queryRunner.query(`DROP TABLE \`calentamiento_pasteurizador\``);
        await queryRunner.query(`DROP INDEX \`REL_6ea2f63956e51c6036aee2a7ab\` ON \`enfriamiento_temperatura\``);
        await queryRunner.query(`DROP TABLE \`enfriamiento_temperatura\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_be9403373c3862601462e3672a\` ON \`lote\` (\`id_ciclo\`)`);
    }

}
