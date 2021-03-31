import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1617214567277 implements MigrationInterface {
    name = 'SchemaSync1617214567277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" ADD "description" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_b535fbe8ec6d832dde22065ebd" ON "event" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_6e1de41532ad6af403d3ceb4f2" ON "event" ("name", "type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_6e1de41532ad6af403d3ceb4f2"`);
        await queryRunner.query(`DROP INDEX "IDX_b535fbe8ec6d832dde22065ebd"`);
        await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "description"`);
    }

}
