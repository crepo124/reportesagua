import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1788990765080 implements MigrationInterface {
    name = 'CreateInitialTables1788990765080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SYSTEM_USER" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isNotificationEnabled" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_3f5912604df1254054eac4f2b5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "WATER_REPORT" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "description" character varying NOT NULL, "severity" character varying NOT NULL, "reporterPhone" character varying NOT NULL, "isResolved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b232cdd6d3e95978564720c2ebe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "WATER_REPORT"`);
        await queryRunner.query(`DROP TABLE "SYSTEM_USER"`);
    }

}
