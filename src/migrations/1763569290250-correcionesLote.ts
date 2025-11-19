import { MigrationInterface, QueryRunner } from "typeorm";

export class CorrecionesLote1763569290250 implements MigrationInterface {
    name = 'CorrecionesLote1763569290250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lote\` DROP FOREIGN KEY \`FK_854448de7460299a8d402708112\``);
        await queryRunner.query(`DROP INDEX \`REL_854448de7460299a8d40270811\` ON \`lote\``);
        await queryRunner.query(`ALTER TABLE \`ciclo\` DROP COLUMN \`fecha\``);
        await queryRunner.query(`ALTER TABLE \`lote\` DROP COLUMN \`id_frasco_crudo\``);
        await queryRunner.query(`ALTER TABLE \`lote\` ADD CONSTRAINT \`FK_cd03609638866c3e8cb3dc2759b\` FOREIGN KEY (\`id_lote\`) REFERENCES \`control_reenvase_friam_032\`(\`id_control_reenvase\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lote\` DROP FOREIGN KEY \`FK_cd03609638866c3e8cb3dc2759b\``);
        await queryRunner.query(`ALTER TABLE \`lote\` ADD \`id_frasco_crudo\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ciclo\` ADD \`fecha\` date NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_854448de7460299a8d40270811\` ON \`lote\` (\`id_frasco_crudo\`)`);
        await queryRunner.query(`ALTER TABLE \`lote\` ADD CONSTRAINT \`FK_854448de7460299a8d402708112\` FOREIGN KEY (\`id_frasco_crudo\`) REFERENCES \`control_reenvase_friam_032\`(\`id_control_reenvase\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
