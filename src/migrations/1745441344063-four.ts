import { MigrationInterface, QueryRunner } from "typeorm";

export class Four1745441344063 implements MigrationInterface {
    name = 'Four1745441344063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`madres_donantes_friam_018\` (\`id_madre_donante\` int NOT NULL AUTO_INCREMENT, \`donante_exclusivo\` int NOT NULL, \`tipo_donante\` enum ('interna', 'externa') NOT NULL, \`recoleccion_domicilio\` int NOT NULL, \`capacitado\` varchar(255) NOT NULL, \`recibio_educacion\` text NOT NULL, \`donante_apta\` int NULL, \`firma_donante\` text NULL, \`firma_profesional\` text NULL, \`id_madre_potencial\` int NULL, UNIQUE INDEX \`REL_41da793ff71343562989199d51\` (\`id_madre_potencial\`), PRIMARY KEY (\`id_madre_donante\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hijos_madres\` ADD CONSTRAINT \`FK_721b3389814aa7ac3f91d6e65be\` FOREIGN KEY (\`id_madres_donantes\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`gestacion\` ADD CONSTRAINT \`FK_2460bc99cbba8f792b0591f3339\` FOREIGN KEY (\`id_madre_potencial\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`examenes_prenatal\` ADD CONSTRAINT \`FK_ead7a9dd59defcdf661bc2162e6\` FOREIGN KEY (\`id_madre_donante\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`laboratorios\` ADD CONSTRAINT \`FK_2795cd1d07b36cdaf4e5eebc782\` FOREIGN KEY (\`id_tipo_laboratorio\`) REFERENCES \`tipo_laboratorio\`(\`id_tipo_laboratorio\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`laboratorios\` ADD CONSTRAINT \`FK_84e03715776bde094efbc5bf39e\` FOREIGN KEY (\`id_madres_donantes\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medicamentos\` ADD CONSTRAINT \`FK_a3cab5c8691832df9c446fac3da\` FOREIGN KEY (\`id_madre_donante\`) REFERENCES \`madres_donantes_friam_018\`(\`id_madre_donante\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`madres_donantes_friam_018\` ADD CONSTRAINT \`FK_41da793ff71343562989199d51d\` FOREIGN KEY (\`id_madre_potencial\`) REFERENCES \`madres_potenciales\`(\`id_madre_potencial\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`madres_donantes_friam_018\` DROP FOREIGN KEY \`FK_41da793ff71343562989199d51d\``);
        await queryRunner.query(`ALTER TABLE \`medicamentos\` DROP FOREIGN KEY \`FK_a3cab5c8691832df9c446fac3da\``);
        await queryRunner.query(`ALTER TABLE \`laboratorios\` DROP FOREIGN KEY \`FK_84e03715776bde094efbc5bf39e\``);
        await queryRunner.query(`ALTER TABLE \`laboratorios\` DROP FOREIGN KEY \`FK_2795cd1d07b36cdaf4e5eebc782\``);
        await queryRunner.query(`ALTER TABLE \`examenes_prenatal\` DROP FOREIGN KEY \`FK_ead7a9dd59defcdf661bc2162e6\``);
        await queryRunner.query(`ALTER TABLE \`gestacion\` DROP FOREIGN KEY \`FK_2460bc99cbba8f792b0591f3339\``);
        await queryRunner.query(`ALTER TABLE \`hijos_madres\` DROP FOREIGN KEY \`FK_721b3389814aa7ac3f91d6e65be\``);
        await queryRunner.query(`DROP INDEX \`REL_41da793ff71343562989199d51\` ON \`madres_donantes_friam_018\``);
        await queryRunner.query(`DROP TABLE \`madres_donantes_friam_018\``);
    }

}
