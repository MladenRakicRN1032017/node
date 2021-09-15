const express = require('express')
const mysql = require('mysql')
const Joi = require('joi');
const router = express.Router()

// db init
const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library'
});

const schema = Joi.object({
    title: Joi.string().max(100).required(),
    author: Joi.string().max(100).required(),
    isbn: Joi.string().max(100).required(),
    publish_year: Joi.number().integer().min(1000).max(2021),
    category: Joi.string().max(100)
})

router.use(express.json())

router.get('/', (req, res) => {
    pool.query('SELECT * FROM books', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});


// Search by category
router.get('/category/:cat', (req, res) => {
    let query = 'SELECT * FROM books WHERE category = ?';
    let formated = mysql.format(query, [req.params.cat]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    }); 
})



// Search by title
router.get('/search/:title', (req, res) => {
    let query = 'SELECT * FROM books WHERE title like ?';
    let formated = mysql.format(query, [req.params.title + '%']);

    pool.query(formated, (err, rows) => {
        if (err) {
            res.status(500).send(err.sqlMessage);
        } else {
            res.send(rows);
        }
    }); 
})


router.get('/tag/:tag', (req, res) => {
    let query = 'SELECT book_id FROM book_tag WHERE tag = ?';
    let formated = mysql.format(query, [req.params.tag]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    }); 
})


router.get('/:id', (req, res) => {
    let query = 'SELECT * FROM books WHERE id = ?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows[0]);
    });
})







module.exports = router
