import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsFriam0161760974681313 implements MigrationInterface {
    name = 'AddColumnsFriam0161760974681313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_ed01470b6a004857c2277c9a5e7\` ON \`entradas_salidas_friam_012\``);
        await queryRunner.query(`ALTER TABLE \`leche_sala_extraccion_friam_016\` DROP COLUMN \`motivo_consulta\``);
        await queryRunner.query(`ALTER TABLE \`leche_sala_extraccion_friam_016\` DROP COLUMN \`observaciones\``);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`barrio\` \`barrio\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`direccion\` \`direccion\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_friam_012\` ADD CONSTRAINT \`FK_ed01470b6a004857c2277c9a5e7\` FOREIGN KEY (\`id_madre_donante\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`entradas_salidas_friam_012\` DROP FOREIGN KEY \`FK_ed01470b6a004857c2277c9a5e7\``);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`direccion\` \`direccion\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`barrio\` \`barrio\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`leche_sala_extraccion_friam_016\` ADD \`observaciones\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`leche_sala_extraccion_friam_016\` ADD \`motivo_consulta\` text NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_ed01470b6a004857c2277c9a5e7\` ON \`entradas_salidas_friam_012\` (\`id_madre_donante\`)`);
    }

}
