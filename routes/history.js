const express = require('express')
const mysql = require('mysql');
const router = express.Router()
// auth
const verifyToken = require('../auth/auth')

// db init
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library'
});

router.use(express.json())
router.use('/', verifyToken)

router.get('/', (req, res) => {
    let query = 'SELECT book_id, books.title, start_date, return_date FROM history JOIN books ON history.book_id = books.id WHERE member_id = ?';
    let formated = mysql.format(query, [req.member.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
})


module.exports = router