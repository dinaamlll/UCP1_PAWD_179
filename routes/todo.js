const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Menampilkan daftar dokter
router.get('/', (req, res) => {
  db.query('SELECT * FROM doctor', (err, doctors) => {
    if (err) throw err;
    res.render('todo', { doctors });
  });
});

// Menambahkan dokter baru
router.post('/add', (req, res) => {
  const { nama, nohp } = req.body;
  db.query('INSERT INTO doctor (nama, nohp) VALUES (?, ?)', [nama, nohp], (err) => {
    if (err) throw err;
    res.redirect('/doctors');  // Setelah berhasil, redirect ke daftar dokter
  });
});

// Menghapus dokter
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM doctor WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/doctors');
  });
});

// Mengedit dokter
router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM doctor WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.render('todo-form', { doctor: result[0] });
  });
});

// Mengupdate dokter
router.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { nama, nohp } = req.body;
  db.query('UPDATE doctor SET nama = ?, nohp = ? WHERE id = ?', [nama, nohp, id], (err) => {
    if (err) throw err;
    res.redirect('/doctors');
  });
});

module.exports = router;
