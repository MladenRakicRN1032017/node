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
    let query = 'SELECT book_id, loan_date, return_date FROM history WHERE member_id = ?';
    let formated = mysql.format(query, [req.user.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
})


module.exports = router