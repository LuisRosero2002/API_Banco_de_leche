import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConformidadesTable1764913970224 implements MigrationInterface {
    name = 'UpdateConformidadesTable1764913970224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Verificar si la columna acidez ya existe
        const table = await queryRunner.getTable("conformidades_friam_017");
        const acidezColumn = table?.findColumnByName("acidez");

        if (!acidezColumn) {
            await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` ADD \`acidez\` int NULL`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("conformidades_friam_017");
        const acidezColumn = table?.findColumnByName("acidez");

        if (acidezColumn) {
            await queryRunner.query(`ALTER TABLE \`conformidades_friam_017\` DROP COLUMN \`acidez\``);
        }
    }

}
