import { MigrationInterface, QueryRunner } from "typeorm";

export class FixControlMicrobiologico1765426649075 implements MigrationInterface {
    name = 'FixControlMicrobiologico1765426649075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`control_microbiologico_friam_014\` ADD CONSTRAINT \`FK_ffe5da16953ea6eea47eb9896f1\` FOREIGN KEY (\`id_info_control\`) REFERENCES \`info_control_microbiologico\`(\`id_info_control\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`control_microbiologico_friam_014\` DROP FOREIGN KEY \`FK_ffe5da16953ea6eea47eb9896f1\``);
    }

}
