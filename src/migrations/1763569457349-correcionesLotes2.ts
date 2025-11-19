import { MigrationInterface, QueryRunner } from "typeorm";

export class CorrecionesLotes21763569457349 implements MigrationInterface {
    name = 'CorrecionesLotes21763569457349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lote\` DROP FOREIGN KEY \`FK_cd03609638866c3e8cb3dc2759b\``);
        await queryRunner.query(`ALTER TABLE \`lote\` ADD \`id_control_reenvase\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lote\` ADD UNIQUE INDEX \`IDX_b412905fa24b6678e61ba6d078\` (\`id_control_reenvase\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b412905fa24b6678e61ba6d078\` ON \`lote\` (\`id_control_reenvase\`)`);
        await queryRunner.query(`ALTER TABLE \`lote\` ADD CONSTRAINT \`FK_b412905fa24b6678e61ba6d078f\` FOREIGN KEY (\`id_control_reenvase\`) REFERENCES \`control_reenvase_friam_032\`(\`id_control_reenvase\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`lote\` DROP FOREIGN KEY \`FK_b412905fa24b6678e61ba6d078f\``);
        await queryRunner.query(`DROP INDEX \`REL_b412905fa24b6678e61ba6d078\` ON \`lote\``);
        await queryRunner.query(`ALTER TABLE \`lote\` DROP INDEX \`IDX_b412905fa24b6678e61ba6d078\``);
        await queryRunner.query(`ALTER TABLE \`lote\` DROP COLUMN \`id_control_reenvase\``);
        await queryRunner.query(`ALTER TABLE \`lote\` ADD CONSTRAINT \`FK_cd03609638866c3e8cb3dc2759b\` FOREIGN KEY (\`id_lote\`) REFERENCES \`control_reenvase_friam_032\`(\`id_control_reenvase\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
