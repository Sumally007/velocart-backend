const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// ROUTE YA /api/products ILIYOWEKEWA MFUMO WA SEARCH
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    if (search && search.trim() !== '') {
      const queryText = 'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1 OR category ILIKE $1';
      const result = await pool.query(queryText, [`%${search.trim()}%`]);
      return res.json(result.rows);
    }

    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
