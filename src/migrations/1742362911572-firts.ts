import { MigrationInterface, QueryRunner } from "typeorm";

export class Firts1742362911572 implements MigrationInterface {
    name = 'Firts1742362911572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`entidades\` (\`id_entidad\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id_entidad\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`info_madres\` (\`id_info_madre\` int NOT NULL AUTO_INCREMENT, \`nombre_completo\` varchar(255) NOT NULL, \`documento\` varchar(255) NOT NULL, \`fecha_nacimiento\` date NOT NULL, \`fecha_parto\` date NOT NULL, \`telefono\` varchar(255) NOT NULL, \`departamento\` varchar(255) NOT NULL, \`ciudad\` varchar(255) NOT NULL, \`barrio\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, \`profesion\` varchar(255) NOT NULL, \`eps\` varchar(255) NOT NULL, PRIMARY KEY (\`id_info_madre\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`madres_potenciales\` (\`id_madre_potencial\` int NOT NULL AUTO_INCREMENT, \`educacion_presencial\` int NULL, \`fecha_llamada\` date NULL, \`llamada\` enum ('saliente', 'entrante') NULL, \`asesoria\` int NULL, \`donante_efectiva\` int NULL, \`fecha_visita\` date NULL, \`observacion\` text NULL, \`fecha_registro\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id_entidad\` int NULL, \`id_empleado\` int NULL, \`id_info_madre\` int NULL, UNIQUE INDEX \`REL_2d4cf3dcde30c89e0a109f2963\` (\`id_info_madre\`), PRIMARY KEY (\`id_madre_potencial\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`empleados\` (\`id_empleado\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`cargo\` varchar(255) NOT NULL, \`telefono\` int NOT NULL, \`correo\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_empleado\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id_rol\` int NOT NULL AUTO_INCREMENT, \`descripcion\` varchar(255) NOT NULL, \`activo\` bit NOT NULL, PRIMARY KEY (\`id_rol\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_usuario\` (\`id_rol_usuario\` int NOT NULL AUTO_INCREMENT, \`id_usuario\` int NULL, \`id_rol\` int NULL, PRIMARY KEY (\`id_rol_usuario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sessions\` (\`id_session\` int NOT NULL AUTO_INCREMENT, \`token\` text NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id_usuario\` int NULL, UNIQUE INDEX \`REL_28c6203d0fc25270aee51ab355\` (\`id_usuario\`), PRIMARY KEY (\`id_session\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id_usuario\` int NOT NULL AUTO_INCREMENT, \`usuario\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`activo\` int NOT NULL DEFAULT '1', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id_empleado\` int NULL, UNIQUE INDEX \`REL_8469926fc9082fe7c3081e10cd\` (\`id_empleado\`), PRIMARY KEY (\`id_usuario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`madres_potenciales\` ADD CONSTRAINT \`FK_db2e2e0169a763b580bd1d358e9\` FOREIGN KEY (\`id_entidad\`) REFERENCES \`entidades\`(\`id_entidad\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`madres_potenciales\` ADD CONSTRAINT \`FK_1e31c4ec2202b8b1b385f472805\` FOREIGN KEY (\`id_empleado\`) REFERENCES \`empleados\`(\`id_empleado\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`madres_potenciales\` ADD CONSTRAINT \`FK_2d4cf3dcde30c89e0a109f29633\` FOREIGN KEY (\`id_info_madre\`) REFERENCES \`info_madres\`(\`id_info_madre\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`madres_potenciales\` DROP FOREIGN KEY \`FK_2d4cf3dcde30c89e0a109f29633\``);
        await queryRunner.query(`ALTER TABLE \`madres_potenciales\` DROP FOREIGN KEY \`FK_1e31c4ec2202b8b1b385f472805\``);
        await queryRunner.query(`ALTER TABLE \`madres_potenciales\` DROP FOREIGN KEY \`FK_db2e2e0169a763b580bd1d358e9\``);
        await queryRunner.query(`DROP INDEX \`REL_8469926fc9082fe7c3081e10cd\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`REL_28c6203d0fc25270aee51ab355\` ON \`sessions\``);
        await queryRunner.query(`DROP TABLE \`sessions\``);
        await queryRunner.query(`DROP TABLE \`roles_usuario\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`empleados\``);
        await queryRunner.query(`DROP INDEX \`REL_2d4cf3dcde30c89e0a109f2963\` ON \`madres_potenciales\``);
        await queryRunner.query(`DROP TABLE \`madres_potenciales\``);
        await queryRunner.query(`DROP TABLE \`info_madres\``);
        await queryRunner.query(`DROP TABLE \`entidades\``);
    }

}
