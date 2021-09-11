const express = require('express')
const app = express()
const port = 8000
const dateConverter = require('./converters/dateToSql')
require("dotenv").config();
// routes
const books = require('./routes/books')
const categories = require('./routes/categories')
const users = require('./routes/users')
const loansHistory = require('./routes/loansHistory')
const loans = require('./routes/loans')


app.use('/books', books)
app.use('/categories', categories)
app.use('/users', users)
app.use('/history', loansHistory)
app.use('/loans', loans)

app.get('/', (req, res) => {
    res.json('Homepage')
    console.log(dateConverter)
})


app.listen(port, () => {
    console.log(`Started listening on port ${port}!`)
});