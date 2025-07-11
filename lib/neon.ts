import { neon } from '@neondatabase/serverless';

// Read from env
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL not set in env');

export const sql = neon(connectionString);
export { neon };