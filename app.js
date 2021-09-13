const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
require("dotenv").config();
// routes
const books = require('./routes/books')
const categories = require('./routes/categories')
const users = require('./routes/users')
const loansHistory = require('./routes/loansHistory')
const loans = require('./routes/loans')


/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});*/

app.use(cors())

app.use('/books', books)
app.use('/categories', categories)
app.use('/users', users)
app.use('/history', loansHistory)
app.use('/loans', loans)


app.get('/', (req, res) => {
    res.send('Homepage')
})


app.listen(port, () => {
    console.log(`Started listening on port ${port}!`)
});