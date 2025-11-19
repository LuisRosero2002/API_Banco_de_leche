import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteCicloLote1763563630148 implements MigrationInterface {
    name = 'DeleteCicloLote1763563630148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` DROP COLUMN \`ciclo\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` DROP COLUMN \`lote\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` ADD \`lote\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` ADD \`ciclo\` int NOT NULL`);
    }

}
