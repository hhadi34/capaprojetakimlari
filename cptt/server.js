const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname)));

const routes = {
  '/anasayfa': 'index.html',
  '/darulmu-AI-limin': 'pages/ai/darulmu-AI-limin.html',
  '/anka': 'pages/iha/anka.html',
  '/rok-et': 'pages/roket/rok-et.html',
  '/abra': 'pages/oyun/abra.html',
  '/frc': 'pages/frc/frc.html'
};

Object.entries(routes).forEach(([route, file]) => {
  app.get(route, (req, res) => res.sendFile(path.join(__dirname, file)));
  app.get(route + '/', (req, res) => res.sendFile(path.join(__dirname, file)));
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
