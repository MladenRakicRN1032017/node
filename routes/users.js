const express = require('express')
const mysql = require('mysql');
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library'
});



const schemaLogin = Joi.object({
    email: Joi.string().min(10).max(100).required(),
    password: Joi.string().min(8).required()
})


router.use(express.json())


router.post('/login', async (req, res) => {
    let { error } = schemaLogin.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        let query = 'SELECT * FROM users WHERE email = ?';
        let formated = mysql.format(query, [req.body.email]);

        pool.query(formated, async (err, rows) => {
            if (err) {
                res.status(500).send(err.sqlMessage)
            } else {
                user = rows[0]
                const match = await bcrypt.compare(req.body.password, user.password);
                const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
                if (match) {
                    res.send({ jwt: accessToken, name: user.name, role: user.role });
                } else {
                    res.status(400).send({ message: "Invalid Credentials" });
                }  
            }
        })

    }
})



module.exports = router