const express = require('express')
const mysql = require('mysql');
const dateConverter = require('../converters/dateToSql')
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
    let query = 'SELECT book_id, books.title, loan_date, due_date FROM loans JOIN books ON loans.book_id = books.id WHERE member_id = ?';
    let formated = mysql.format(query, [req.user.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
})

// Find loan before delete
router.use('/delete', (req, res, next) => {
    let query = 'SELECT * FROM loans WHERE member_id = ? AND book_id = ?'
    let formated = mysql.format(query, [req.body.member, req.body.book])

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            req.body.loanToDelete = rows[0]
            next()
    });
})

// Insert loan in loan history before delete
router.use('/delete', (req, res, next) => {
    let loan = req.body.loanToDelete
    let query = 'INSERT INTO history (book_id, member_id, loan_date, return_date) values (?, ?, ?, ?)'
    let formated = mysql.format(query, [loan.book_id, loan.member_id, loan.loan_date, dateConverter])

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            next()
    });
})

router.delete('/delete', (req, res) => {
    query = 'DELETE FROM loans WHERE member_id = ? AND book_id = ?';
    formated = mysql.format(query, [req.body.member, req.body.book])

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.status(200).send('Row deleted: ' + rows[0])
    });
})

module.exports = router