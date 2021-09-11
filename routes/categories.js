const express = require('express')
const mysql = require('mysql')
const router = express.Router()


const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library'
});

router.use(express.json())

router.get('/', (req, res) => {
    pool.query('SELECT * FROM categories', (err, rows) => {
        if (err)
            res.status(500).send(err.sqlMessage)
        else
            res.send(rows)
    });
})


module.exports = router