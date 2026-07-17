const express = require('express');
const app = express();

// Hostinger otomatis akan me-route PORT, tetapi kita buat fallback ke 3000
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint Tes Utama
app.get('/', (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Tanyaiku SaaS AI API is running successfully!",
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date()
  });
});

// Endpoint Dummy untuk Webhook Fonnte nanti
app.post('/webhook', (req, res) => {
  console.log('Incoming Webhook Data:', req.body);
  res.status(200).send('Webhook received');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
