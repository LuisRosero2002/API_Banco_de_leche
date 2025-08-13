import { MigrationInterface, QueryRunner } from "typeorm";

export class Twelve1755059146015 implements MigrationInterface {
    name = 'Twelve1755059146015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_2795cd1d07b36cdaf4e5eebc782\` ON \`laboratorios\``);
        await queryRunner.query(`ALTER TABLE \`laboratorios\` ADD CONSTRAINT \`FK_2795cd1d07b36cdaf4e5eebc782\` FOREIGN KEY (\`id_tipo_laboratorio\`) REFERENCES \`tipo_laboratorio\`(\`id_tipo_laboratorio\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`laboratorios\` ADD CONSTRAINT \`FK_d2ae7a47a59503250cf66977b64\` FOREIGN KEY (\`id_madre_potencial\`) REFERENCES \`madres_potenciales\`(\`id_madre_potencial\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`laboratorios\` DROP FOREIGN KEY \`FK_d2ae7a47a59503250cf66977b64\``);
        await queryRunner.query(`ALTER TABLE \`laboratorios\` DROP FOREIGN KEY \`FK_2795cd1d07b36cdaf4e5eebc782\``);
        await queryRunner.query(`CREATE INDEX \`FK_2795cd1d07b36cdaf4e5eebc782\` ON \`laboratorios\` (\`id_tipo_laboratorio\`)`);
    }

}
