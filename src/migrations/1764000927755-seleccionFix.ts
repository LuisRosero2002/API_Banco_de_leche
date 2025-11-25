import { MigrationInterface, QueryRunner } from "typeorm";

export class SeleccionFix1764000927755 implements MigrationInterface {
    name = 'SeleccionFix1764000927755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_54c196757a252c2108212a9627\` ON \`seleccion_clasificacion_friam_015\``);
        await queryRunner.query(`ALTER TABLE \`seleccion_clasificacion_friam_015\` CHANGE \`fecha\` \`fecha\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`seleccion_clasificacion_friam_015\` CHANGE \`fecha\` \`fecha\` date NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_54c196757a252c2108212a9627\` ON \`seleccion_clasificacion_friam_015\` (\`id_control_reenvase\`)`);
    }

}
