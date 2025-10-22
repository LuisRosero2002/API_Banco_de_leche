import { MigrationInterface, QueryRunner } from "typeorm";

export class Tablefrhos0631761086973596 implements MigrationInterface {
    name = 'Tablefrhos0631761086973596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`leche_distribucion_frhos_063\` (\`id_leche_distribucion\` int NOT NULL AUTO_INCREMENT, \`fecha\` date NOT NULL, \`volumen_manana\` float NULL, \`volumen_tarde\` float NULL, \`perdidas\` float NULL, \`id_madre_potencial\` int NULL, \`id_empleado\` int NULL, PRIMARY KEY (\`id_leche_distribucion\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`leche_distribucion_frhos_063\` ADD CONSTRAINT \`FK_6ec51aaf89275128b9cba81e72b\` FOREIGN KEY (\`id_madre_potencial\`) REFERENCES \`madres_potenciales\`(\`id_madre_potencial\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`leche_distribucion_frhos_063\` ADD CONSTRAINT \`FK_0ff8ab69b560eb2b3bc1c02b367\` FOREIGN KEY (\`id_empleado\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`leche_distribucion_frhos_063\` DROP FOREIGN KEY \`FK_0ff8ab69b560eb2b3bc1c02b367\``);
        await queryRunner.query(`ALTER TABLE \`leche_distribucion_frhos_063\` DROP FOREIGN KEY \`FK_6ec51aaf89275128b9cba81e72b\``);
        await queryRunner.query(`DROP TABLE \`leche_distribucion_frhos_063\``);
    }

}
