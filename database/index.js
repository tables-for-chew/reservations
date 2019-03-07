const { Pool } = require('pg');
const config = require('../database/config');

const pool = new Pool(config);

module.exports = pool;
