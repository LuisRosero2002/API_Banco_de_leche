import { MigrationInterface, QueryRunner } from "typeorm";

export class Six1747190768384 implements MigrationInterface {
    name = 'Six1747190768384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d4e4c2827125c46c9804270645\` ON \`gestacion\``);
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` ADD \`id_madre_donante\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` ADD UNIQUE INDEX \`IDX_7a6a320f8d34398bd7ea1a5008\` (\`id_madre_donante\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_7a6a320f8d34398bd7ea1a5008\` ON \`casas_visitas\` (\`id_madre_donante\`)`);
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` ADD CONSTRAINT \`FK_7a6a320f8d34398bd7ea1a50089\` FOREIGN KEY (\`id_madre_donante\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` DROP FOREIGN KEY \`FK_7a6a320f8d34398bd7ea1a50089\``);
        await queryRunner.query(`DROP INDEX \`REL_7a6a320f8d34398bd7ea1a5008\` ON \`casas_visitas\``);
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` DROP INDEX \`IDX_7a6a320f8d34398bd7ea1a5008\``);
        await queryRunner.query(`ALTER TABLE \`casas_visitas\` DROP COLUMN \`id_madre_donante\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d4e4c2827125c46c9804270645\` ON \`gestacion\` (\`id_madre_donante\`)`);
    }

}
