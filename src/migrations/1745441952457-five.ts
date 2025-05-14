import { MigrationInterface, QueryRunner } from "typeorm";

export class Five1745441952457 implements MigrationInterface {
    name = 'Five1745441952457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gestacion\` DROP FOREIGN KEY \`FK_2460bc99cbba8f792b0591f3339\``);
        await queryRunner.query(`DROP INDEX \`REL_2460bc99cbba8f792b0591f333\` ON \`gestacion\``);
        await queryRunner.query(`ALTER TABLE \`gestacion\` CHANGE \`id_madre_potencial\` \`id_madre_donante\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`gestacion\` ADD UNIQUE INDEX \`IDX_d4e4c2827125c46c9804270645\` (\`id_madre_donante\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d4e4c2827125c46c9804270645\` ON \`gestacion\` (\`id_madre_donante\`)`);
        await queryRunner.query(`ALTER TABLE \`gestacion\` ADD CONSTRAINT \`FK_d4e4c2827125c46c98042706457\` FOREIGN KEY (\`id_madre_donante\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gestacion\` DROP FOREIGN KEY \`FK_d4e4c2827125c46c98042706457\``);
        await queryRunner.query(`DROP INDEX \`REL_d4e4c2827125c46c9804270645\` ON \`gestacion\``);
        await queryRunner.query(`ALTER TABLE \`gestacion\` DROP INDEX \`IDX_d4e4c2827125c46c9804270645\``);
        await queryRunner.query(`ALTER TABLE \`gestacion\` CHANGE \`id_madre_donante\` \`id_madre_potencial\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_2460bc99cbba8f792b0591f333\` ON \`gestacion\` (\`id_madre_potencial\`)`);
        await queryRunner.query(`ALTER TABLE \`gestacion\` ADD CONSTRAINT \`FK_2460bc99cbba8f792b0591f3339\` FOREIGN KEY (\`id_madre_potencial\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
