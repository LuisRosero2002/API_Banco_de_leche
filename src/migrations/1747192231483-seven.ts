import { MigrationInterface, QueryRunner } from "typeorm";

export class Seven1747192231483 implements MigrationInterface {
    name = 'Seven1747192231483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` ADD CONSTRAINT \`FK_7a6a320f8d34398bd7ea1a50089\` FOREIGN KEY (\`id_madre_donante\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` DROP FOREIGN KEY \`FK_7a6a320f8d34398bd7ea1a50089\``);
    }

}
