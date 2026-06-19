const { Pool } = require('pg');
require('dotenv').config();

// Kama tupo live mtandaoni, tutatumia connectionString ya DATABASE_URL
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL Connected Successfully!');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle database client', err);
});

module.exports = pool;
