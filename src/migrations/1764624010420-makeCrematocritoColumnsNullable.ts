import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeCrematocritoColumnsNullable1764624010420 implements MigrationInterface {
    name = 'MakeCrematocritoColumnsNullable1764624010420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`ct1\` \`ct1\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`ct2\` \`ct2\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`ct3\` \`ct3\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`cc1\` \`cc1\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`cc2\` \`cc2\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`cc3\` \`cc3\` float NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`cc3\` \`cc3\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`cc2\` \`cc2\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`cc1\` \`cc1\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`ct3\` \`ct3\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`ct2\` \`ct2\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`crematocrito\` CHANGE \`ct1\` \`ct1\` float NOT NULL`);
    }
}