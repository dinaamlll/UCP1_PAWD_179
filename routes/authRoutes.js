const express = require("express");
const router = express.Router();
const db = require("../database/db");

// READ: Get all doctors
router.get("/", (req, res) => {
    const sql = "SELECT * FROM doctors";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render("doctors", { doctors: results });
    });
});

// CREATE: Add a new doctor
router.post("/add", (req, res) => {
    const { nama, nohp } = req.body;
    const sql = "INSERT INTO doctors (nama, nohp) VALUES (?, ?)";
    db.query(sql, [nama, nohp], (err) => {
        if (err) throw err;
        res.redirect("/doctors");
    });
});

// UPDATE: Edit doctor data
router.post("/edit/:id", (req, res) => {
    const { id } = req.params;
    const { nama, nohp } = req.body;
    const sql = "UPDATE doctors SET nama = ?, nohp = ? WHERE id = ?";
    db.query(sql, [nama, nohp, id], (err) => {
        if (err) throw err;
        res.redirect("/doctors");
    });
});

// DELETE: Remove a doctor
router.get("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM doctors WHERE id = ?";
    db.query(sql, [id], (err) => {
        if (err) throw err;
        res.redirect("/doctors");
    });
});

module.exports = router;
