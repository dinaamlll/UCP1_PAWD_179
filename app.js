const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Koneksi Database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: '', // Ganti dengan password MySQL Anda
  database: 'hospital_db'
});

// Cek koneksi database
db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

// Routing untuk halaman utama
app.get('/', (req, res) => {
  res.render('index');
});

// Routing untuk halaman dokter dan pasien
app.use('/doctors', require('./routes/todo'));
app.use('/patients', require('./routes/todo'));

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
