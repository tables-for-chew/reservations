let mysql = require('mysql');
let config = require('./config.js');

let connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.error('Error connecting to mysql server: ', err);
    return;
  } else {
    console.log('Connected as id: ', connection.threadId);
  }
});

module.exports.connection = connection;
