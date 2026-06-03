import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

export class init1780491454723 implements MigrationInterface {
    name = 'init1780491454723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const filePath = path.join(process.cwd(), 'src/global/database/sql/init.sql');
        const sql = await fs.readFile(filePath, 'utf-8');
        await queryRunner.query(sql);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP VIEW "vw_resumen_locales"`);
        await queryRunner.query(`DROP VIEW "vw_votantes"`);
        await queryRunner.query(`DROP TABLE "votante_local"`);
        await queryRunner.query(`DROP TABLE "votante"`);
        await queryRunner.query(`DROP TABLE "local"`);
        await queryRunner.query(`DROP TABLE "zona"`);
        await queryRunner.query(`DROP TABLE "distrito"`);
        await queryRunner.query(`DROP TABLE "departamento"`);
    }

}
