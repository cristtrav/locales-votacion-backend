import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    synchronize: false,
    entities: ['src/global/database/entity/*.entity.ts'],
    migrations: ['src/global/database/migrations/*.ts'],
    migrationsTableName: 'public.migrations'
})