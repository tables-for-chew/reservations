require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const parser = require('body-parser');
const cors = require('cors');

const router = require('./router.js');

const app = express();
const port = 3333;

app.use(cors());
// app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/:id', express.static(`${__dirname}/../public`));

app.use('/api/reserve', router);

app.listen(port, console.log(`Now serving port ${port}.`));
