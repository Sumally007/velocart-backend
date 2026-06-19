const { Pool } = require('pg');
require('dotenv').config();

// Sanidi muunganisho wa Database Pool kama ulivyofanya kwenye productRoutes
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'velocart_db',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

const createUsersTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
    try {
        await pool.query(queryText);
        console.log("✅ [DATABASE] Table ya users ipo tayari!");
    } catch (err) {
        console.error("❌ [DATABASE] Imeshindwa kutengeneza table ya users:", err.message);
    }
};

createUsersTable();

module.exports = pool;
