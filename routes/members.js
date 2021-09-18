const express = require('express')
const mysql = require('mysql');
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const dateConverter = require('../converters/dateToSql');
const { response } = require('express');
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

const schemaRegister = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().min(10).max(100).required(),
    password: Joi.string().min(8).required()
})

const schemaEdit = Joi.object({
    name: Joi.string().max(100).required(),
    password: Joi.string().min(8).required()
})


router.use(express.json())


router.post('/login', async (req, res) => {
    let { error } = schemaLogin.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        let query = 'SELECT * FROM members WHERE email = ?';
        let formated = mysql.format(query, [req.body.email]);

        pool.query(formated, async (err, rows) => {
            if (err) {
                res.status(500).send(err.sqlMessage)
            } else {
                member = rows[0]
                if (member.active == 0) {
                    res.status(400).send({message: "Membership not activated yet!"})
                } else {
                    const match = await bcrypt.compare(req.body.password, member.password);
                    const accessToken = jwt.sign(JSON.stringify(member), process.env.TOKEN_SECRET)
                    if (match) {
                        res.send({ jwt: accessToken, name: member.name, email: member.email, membership_until: member.membership_until });
                    } else {
                        res.status(400).send('Invalid credentials!');
                    }   
                }  
            }
        })

    }
})


router.put('/edit/', async (req, res) => {
    let { error } = schemaEdit.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        let encryptedPassword = await bcrypt.hash(req.body.password, 10);
        let query = 'UPDATE members SET name=?, password=? WHERE id = ?';
        let formated = mysql.format(query, [req.body.name, encryptedPassword, req.member.id]);

        pool.query(formated, (err, rows) => {
            if (err) {
                res.status(500).send(err.sqlMessage)
            } else {
                query = 'SELECT name, email, membership_until FROM members WHERE id = ?'
                formated = mysql.format(query, [req.member.id])
                
                pool.query(formated, (error, result) => {
                    if (error) {
                        res.status(500).send(err.sqlMessage)
                    } else {
                        res.send(result[0])
                    }
                })
            }
        })
    }
})

router.use('/register', (req, res, next) => {
    let { error } = schemaRegister.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
    } else {
        let query = 'SELECT * FROM members WHERE email = ?';
        let formated = mysql.format(query, [req.body.email]);

        pool.query(formated, (err, rows) => {
            if (err) {
                res.status(500).send(err.sqlMessage)
            } else {
                if (rows.length > 0) {
                    res.status(409).send("User Already Exist. Please Login");
                } else {
                    next()
                }
            }
        })
    }
})

router.post('/register', async(req, res) => {
    encryptedPassword = await bcrypt.hash(req.body.password, 10);
    let query = 'INSERT INTO members (name, email, password, membership_until) values (?, ?, ?, ?)'
    let formated = mysql.format(query, [req.body.name, req.body.email, encryptedPassword, dateConverter])

    pool.query(formated, (err, response) => {
        if (err) {
            console.log(err.sqlMessage)
            res.status(500).send(err.sqlMessage)
        } else {
            res.sendStatus(200)
        }
    })
    
})



module.exports = router