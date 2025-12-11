import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMicrobiologico1765387956161 implements MigrationInterface {
    name = 'FixMicrobiologico1765387956161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Primero eliminamos la FK real
        await queryRunner.query(`
            ALTER TABLE \`control_microbiologico_friam_014\`
            DROP FOREIGN KEY \`FK_ffe5da16953ea6eea47eb9896f1\`;
        `);

        // Luego eliminamos el índice asociado
        await queryRunner.query(`
            DROP INDEX \`REL_ffe5da16953ea6eea47eb9896f\`
            ON \`control_microbiologico_friam_014\`;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Restaurar el índice
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_ffe5da16953ea6eea47eb9896f\`
            ON \`control_microbiologico_friam_014\`(\`id_info_control\`);
        `);

        // Restaurar la FK con el nombre real que usa MySQL
        await queryRunner.query(`
            ALTER TABLE \`control_microbiologico_friam_014\`
            ADD CONSTRAINT \`FK_ffe5da16953ea6eea47eb9896f1\`
            FOREIGN KEY (\`id_info_control\`)
            REFERENCES \`info_control_microbiologico\`(\`id_info_control\`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION;
        `);
    }
}
