const pgp = require('pg-promise')();
const config = require('../database/config');

module.exports = pgp(config);
