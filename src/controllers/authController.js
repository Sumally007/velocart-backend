const db = require('../config/db');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        await db.query(createTableQuery);

        const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'This email is already registered!' });
        }

        const newUser = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, password]
        );

        res.status(201).json({ message: 'Registration successful!', user: newUser.rows[0] });
    } catch (error) {
        console.error("❌ Registration Error:", error.message);
        res.status(500).json({ message: 'Database saving failed: ' + error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password!' });
        }

        if (user.rows[0].password !== password) {
            return res.status(400).json({ message: 'Invalid email or password!' });
        }

        res.status(200).json({ message: 'Login successful!', user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email } });
    } catch (error) {
        console.error("❌ Login Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};
