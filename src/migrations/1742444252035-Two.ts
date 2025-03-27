import { MigrationInterface, QueryRunner } from "typeorm";

export class Two1742444252035 implements MigrationInterface {
    name = 'Two1742444252035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`info_madres\` DROP COLUMN \`nombre_completo\``);
        await queryRunner.query(`ALTER TABLE \`info_madres\` ADD \`nombre\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` ADD \`apellido\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` ADD \`celular\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`telefono\` \`telefono\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`departamento\` \`departamento\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`ciudad\` \`ciudad\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`profesion\` \`profesion\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`eps\` \`eps\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`eps\` \`eps\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`profesion\` \`profesion\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`ciudad\` \`ciudad\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`departamento\` \`departamento\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` CHANGE \`telefono\` \`telefono\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`info_madres\` DROP COLUMN \`celular\``);
        await queryRunner.query(`ALTER TABLE \`info_madres\` DROP COLUMN \`apellido\``);
        await queryRunner.query(`ALTER TABLE \`info_madres\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`info_madres\` ADD \`nombre_completo\` varchar(255) NOT NULL`);
    }

}
