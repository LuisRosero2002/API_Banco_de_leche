import { MigrationInterface, QueryRunner } from "typeorm";

export class SeleccionClasificacion1763672269766 implements MigrationInterface {
    name = 'SeleccionClasificacion1763672269766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b412905fa24b6678e61ba6d078\` ON \`lote\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` DROP COLUMN \`fecha\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` ADD \`lote_cultivos\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`seleccion_clasificacion_friam_015\` ADD \`id_control_reenvase\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`seleccion_clasificacion_friam_015\` ADD UNIQUE INDEX \`IDX_54c196757a252c2108212a9627\` (\`id_control_reenvase\`)`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` CHANGE \`numero_frascos_pasteurizados\` \`numero_frascos_pasteurizados\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` CHANGE \`volumen\` \`volumen\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` CHANGE \`fecha_vencimiento\` \`fecha_vencimiento\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` CHANGE \`observaciones\` \`observaciones\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` CHANGE \`fecha_vencimiento_cultivos\` \`fecha_vencimiento_cultivos\` date NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_54c196757a252c2108212a9627\` ON \`seleccion_clasificacion_friam_015\` (\`id_control_reenvase\`)`);
        await queryRunner.query(`ALTER TABLE \`seleccion_clasificacion_friam_015\` ADD CONSTRAINT \`FK_54c196757a252c2108212a96277\` FOREIGN KEY (\`id_control_reenvase\`) REFERENCES \`control_reenvase_friam_032\`(\`id_control_reenvase\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`seleccion_clasificacion_friam_015\` DROP FOREIGN KEY \`FK_54c196757a252c2108212a96277\``);
        await queryRunner.query(`DROP INDEX \`REL_54c196757a252c2108212a9627\` ON \`seleccion_clasificacion_friam_015\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` CHANGE \`fecha_vencimiento_cultivos\` \`fecha_vencimiento_cultivos\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` CHANGE \`observaciones\` \`observaciones\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` CHANGE \`fecha_vencimiento\` \`fecha_vencimiento\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` CHANGE \`volumen\` \`volumen\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` CHANGE \`numero_frascos_pasteurizados\` \`numero_frascos_pasteurizados\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`seleccion_clasificacion_friam_015\` DROP INDEX \`IDX_54c196757a252c2108212a9627\``);
        await queryRunner.query(`ALTER TABLE \`seleccion_clasificacion_friam_015\` DROP COLUMN \`id_control_reenvase\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` DROP COLUMN \`lote_cultivos\``);
        await queryRunner.query(`ALTER TABLE \`info_seleccion_clasificacion\` ADD \`fecha\` date NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b412905fa24b6678e61ba6d078\` ON \`lote\` (\`id_control_reenvase\`)`);
    }

}
