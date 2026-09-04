const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname)));

app.get('/anasayfa', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/darulmu-AI-limin', (req, res) => res.sendFile(path.join(__dirname, 'pages/ai/darulmu-AI-limin.html')));
app.get('/anka', (req, res) => res.sendFile(path.join(__dirname, 'pages/iha/anka.html')));
app.get('/rok-et', (req, res) => res.sendFile(path.join(__dirname, 'pages/roket/rok-et.html')));
app.get('/abra', (req, res) => res.sendFile(path.join(__dirname, 'pages/oyun/abra.html')));
app.get('/frc', (req, res) => res.sendFile(path.join(__dirname, 'pages/frc/frc.html')));

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
