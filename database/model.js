var { connection } = require('./index.js');

let getBooksOnLoad = (id, callback) => {
  connection.query(
    {
      sql: 'SELECT bookings_today FROM restaurants WHERE id = ' + id + ';',
      timeout: 2000
    },
    (err, response) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, response);
      }
    }
  );
};

let getOpenTime = (id, date, time, callback) => {
  console.log('searching for restaurant', id, 'at', time, 'on', date);
  connection.query(
    {
      sql: `SELECT * FROM reservations WHERE restaurant_id = ${id} AND date LIKE '%${date}%' AND time = '${time}'`,
      timeout: 2000
    },
    (err, response) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, response);
      }
    }
  );
};

let postTime = (id, date, time, callback) => {
  connection.query(
    {
      sql: `INSERT INTO reservations (restaurant_id, date, time) VALUES (${id}, '${date}', '${time}')`,
      timeout: 2000
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

module.exports.getBooksOnLoad = getBooksOnLoad;
module.exports.getOpenTime = getOpenTime;
module.exports.postTime = postTime;
