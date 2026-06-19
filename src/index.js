const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Ruhusu Frontend yoyote (pamoja na Vercel) iweze kuwasiliana na Backend hii live
app.use(cors());
app.use(express.json());

// Sanidi muunganiko wa Database Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Mtihani wa kuunganisha Database ya Neon
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Error acquiring client:', err.stack);
  }
  console.log('✅ PostgreSQL Connected Successfully!');
  release();
});

// Njia kuu (Routes)
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Kuanzisha Server
app.listen(PORT, () => {
  console.log(`🚀 [SERVER] Live kwenye -> http://localhost:${PORT}`);
});
