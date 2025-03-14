import { MigrationInterface, QueryRunner } from "typeorm";

export class Firts1741983666228 implements MigrationInterface {
    name = 'Firts1741983666228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`empleados\` (\`id_empleado\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`cargo\` varchar(255) NOT NULL, \`telefono\` int NOT NULL, \`correo\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_empleado\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id_rol\` int NOT NULL AUTO_INCREMENT, \`descripcion\` varchar(255) NOT NULL, \`activo\` bit NOT NULL, PRIMARY KEY (\`id_rol\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_usuario\` (\`id_rol_usuario\` int NOT NULL AUTO_INCREMENT, \`id_usuario\` int NULL, \`id_rol\` int NULL, PRIMARY KEY (\`id_rol_usuario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sessions\` (\`id_session\` int NOT NULL AUTO_INCREMENT, \`token\` text NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id_usuario\` int NULL, UNIQUE INDEX \`REL_28c6203d0fc25270aee51ab355\` (\`id_usuario\`), PRIMARY KEY (\`id_session\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id_usuario\` int NOT NULL AUTO_INCREMENT, \`usuario\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`activo\` int NOT NULL DEFAULT '1', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id_empleado\` int NULL, UNIQUE INDEX \`REL_8469926fc9082fe7c3081e10cd\` (\`id_empleado\`), PRIMARY KEY (\`id_usuario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`roles_usuario\` ADD CONSTRAINT \`FK_8bae8214f9f2b55f39d9346b0df\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`usuarios\`(\`id_usuario\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_usuario\` ADD CONSTRAINT \`FK_64aa663ece24eab4d3b661b8318\` FOREIGN KEY (\`id_rol\`) REFERENCES \`roles\`(\`id_rol\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sessions\` ADD CONSTRAINT \`FK_28c6203d0fc25270aee51ab3550\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`usuarios\`(\`id_usuario\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD CONSTRAINT \`FK_8469926fc9082fe7c3081e10cd3\` FOREIGN KEY (\`id_empleado\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP FOREIGN KEY \`FK_8469926fc9082fe7c3081e10cd3\``);
        await queryRunner.query(`ALTER TABLE \`sessions\` DROP FOREIGN KEY \`FK_28c6203d0fc25270aee51ab3550\``);
        await queryRunner.query(`ALTER TABLE \`roles_usuario\` DROP FOREIGN KEY \`FK_64aa663ece24eab4d3b661b8318\``);
        await queryRunner.query(`ALTER TABLE \`roles_usuario\` DROP FOREIGN KEY \`FK_8bae8214f9f2b55f39d9346b0df\``);
        await queryRunner.query(`DROP INDEX \`REL_8469926fc9082fe7c3081e10cd\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`REL_28c6203d0fc25270aee51ab355\` ON \`sessions\``);
        await queryRunner.query(`DROP TABLE \`sessions\``);
        await queryRunner.query(`DROP TABLE \`roles_usuario\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`empleados\``);
    }

}
