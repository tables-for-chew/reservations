require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');

const router = require('./router.js');

const app = express();
const port = 3333;

app.use(cors());
// app.use(morgan('dev'));

app.use(express.static(`${__dirname}/../public`));
app.use('/:id', express.static(`${__dirname}/../public`));

app.use('/api/reserve', router);

app.listen(port, console.log(`Now serving port ${port}.`));
