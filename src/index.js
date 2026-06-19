const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

console.log("🚀 [DEBUG] Node.js server starting up...");

// 1. Product and search routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// 2. Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 3. PAYMENT ENDPOINT
app.post('/api/pay', (req, res) => {
  const { amount, phone } = req.body;
  console.log(`💰 [PAYMENT] New payment request received! Amount: TZS ${amount} to Phone: ${phone}`);
  
  res.status(200).json({ 
    success: true, 
    message: "Push notification triggered successfully" 
  });
});

app.get('/', (req, res) => {
  res.json({ message: "VeloCart API is running smoothly!" });
});

app.listen(PORT, () => {
  console.log(`🎯 [SERVER] Live on -> http://localhost:${PORT}`);
});
