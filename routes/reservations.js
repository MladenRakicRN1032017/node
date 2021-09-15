const express = require('express')
const mysql = require('mysql');
const router = express.Router()
const dateConverter = require('../converters/dateToSql')
// auth
const verifyToken = require('../auth/auth');

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

// Get all reservations
router.get('/', (req, res) => {
    let query = 'SELECT book_id, books.title, start_date FROM reservations JOIN books ON reservations.book_id = books.id WHERE member_id = ?';
    let formated = mysql.format(query, [req.member.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
})

// Provera da li je korisnik vec rezervisao knjigu
router.use('/reserve', (req, res, next) => {
    let query = 'SELECT * FROM reservations WHERE book_id = ? AND member_id = ?'
    let formated = mysql.format(query, [req.body.book_id, req.member.id])

    pool.query(formated, (err, rows) => {
        if (err) {
            res.status(500).send(err.sqlMessage)
        } else {
            if (rows.length > 0) {
                res.status(400).send('Knjiga je vec rezervisana!')
            } else {
                next()
            }
        }
    })
})


// Check if reservation possible
router.use('/reserve', (req, res, next) => {
    let query = 'SELECT COUNT(*) as broj FROM reservations WHERE book_id = ?'
    let formated = mysql.format(query, [req.body.book_id])
    
    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else {
            let query = 'SELECT br_komada FROM books WHERE id = ?'
            let formated = mysql.format(query, [req.body.book_id])

            pool.query(formated, (err2, rows2) => {
                if (err2) {
                    res.status(500).send(err2.sqlMessage)
                } else {
                    if (rows2[0].br_komada - rows[0].broj >= 0) {
                        next()
                    } else {
                        res.status(404).send('All books already reserved!')
                    }
                }
            }); 
        }
            
    });
})

// Reserve a book
router.post('/reserve', (req, res) => {
    let query = 'INSERT INTO reservations (member_id, book_id, start_date) values (?, ?, ?)'
    let formated = mysql.format(query, [req.member.id, req.body.book_id, dateConverter])

    pool.query(formated, (error, response) => {
        if (error)
            res.status(500).send(error.sqlMessage);
        else
            query = 'SELECT * FROM reservations where id = ?';
            formated = mysql.format(query, [response.insertId]);

            pool.query(formated, (err, rows) => {
                if (err)
                    res.status(500).send(err.sqlMessage);
                else
                    res.send(rows[0]);
            });
    });
})

module.exports = router