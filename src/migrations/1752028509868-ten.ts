import { MigrationInterface, QueryRunner } from "typeorm";

export class Ten1752028509868 implements MigrationInterface {
    name = 'Ten1752028509868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`madres_donantes_friam_018\` ADD \`id_empleado\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`madres_donantes_friam_018\` ADD CONSTRAINT \`FK_015de2b97ae506d5c510759f103\` FOREIGN KEY (\`id_empleado\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`madres_donantes_friam_018\` DROP FOREIGN KEY \`FK_015de2b97ae506d5c510759f103\``);
        await queryRunner.query(`ALTER TABLE \`madres_donantes_friam_018\` DROP COLUMN \`id_empleado\``);
    }

}
