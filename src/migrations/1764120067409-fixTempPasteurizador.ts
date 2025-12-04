import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTempPasteurizador1764120067409 implements MigrationInterface {
    name = 'FixTempPasteurizador1764120067409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Desactivar FK Checks (Puede que esta necesite el manager.query)
        // await queryRunner.connection.manager.query(`SET FOREIGN_KEY_CHECKS = 0;`); 
        
        // // 2. Ejecutar cada DROP INDEX individualmente con queryRunner.query()
        // // (Sin el punto y coma final, ya que queryRunner.query lo añade implícitamente)
        // await queryRunner.query(`DROP INDEX \`REL_6ea2f63956e51c6036aee2a7ab\` ON \`enfriamiento_temperatura\``);
        // await queryRunner.query(`DROP INDEX \`REL_d8aff0479e126c3cf586dd6fcd\` ON \`calentamiento_pasteurizador\``);
        // await queryRunner.query(`DROP INDEX \`REL_be9403373c3862601462e3672a\` ON \`lote\``);
        
        // // 3. Reactivar FK Checks (Puede que esta necesite el manager.query)
        // await queryRunner.connection.manager.query(`SET FOREIGN_KEY_CHECKS = 1;`); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Aplicamos la misma separación en el DOWN
        await queryRunner.connection.manager.query(`SET FOREIGN_KEY_CHECKS = 0;`);
        
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_be9403373c3862601462e3672a\` ON \`lote\` (\`id_ciclo\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_d8aff0479e126c3cf586dd6fcd\` ON \`calentamiento_pasteurizador\` (\`id_temperatura_pasteurizador\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6ea2f63956e51c6036aee2a7ab\` ON \`enfriamiento_temperatura\` (\`id_temperatura_pasteurizador\`)`);
        
        await queryRunner.connection.manager.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    }

}