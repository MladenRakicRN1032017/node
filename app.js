const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const historyApi = require('connect-history-api-fallback');
const path = require('path')
require("dotenv").config();
// routes
const books = require('./routes/books')
const categories = require('./routes/categories')
const members = require('./routes/members')
const history = require('./routes/history')
const loans = require('./routes/loans')
const reservations = require('./routes/reservations')


/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});*/

app.use(cors())

app.use('/books', books)
app.use('/categories', categories)
app.use('/members', members)
app.use('/reservations', reservations)
app.use('/loans', loans)
app.use('/history', history)


const staticMiddleware = express.static(path.join(__dirname, 'dist'));

app.use(staticMiddleware);
app.use(historyApi());
app.use(staticMiddleware);


app.listen(port, () => {
    console.log(`Started listening on port ${port}!`)
});