import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    port: Number(process.env.PG_PORT) || 5432,
    max: 10,
    idleTimeoutMillis: 30000,
});

const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('PostgreSQL connected!');
        client.release();
    } catch (error) {
        console.error('Unable to connect to PostgreSQL:', error);
    }
};

export { pool, testConnection };
