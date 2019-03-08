const moment = require('moment');
const connection = require('../database');

const getAvailableTimes = async (id, date, time) => {
  try {
    const query = `SELECT rt.time_slot_interval, rv.time \
                  FROM restaurants AS rt LEFT JOIN reservations AS rv \
                  ON (rv.restaurant_id=rt.id) \
                  WHERE rt.id=${id}`;
    const { rows } = await connection.query(query);
    const reservedTimes = rows.map((row) => {
      if (row.date === date) {
        return row.time ? moment(row.time, 'hh:mm:ss').format('HH:mm') : undefined;
      }
    });
    const window = Number(rows[0].time_slot_interval.split(':')[1]);
    const windowSteps = 150 / window;

    // Get all times within a 2.5 hour window of the desired reservation time
    const tempTime = moment(time, 'hh:mm')
      .subtract(150, 'minutes');
    const queryTimes = [tempTime.format('HH:mm').toString()];
    for (let i = 0; i < 2 * windowSteps; i += 1) {
      queryTimes.push(tempTime
        .add(window, 'minute')
        .format('HH:mm')
        .toString());
    }

    // Filter out the times already reserved
    return queryTimes.filter(qTime => !reservedTimes.includes(qTime));
  } catch (err) {
    throw err;
  }
};

const postReservation = async (id, date, time) => {
  try {
    return await connection.query(`INSERT INTO reservations(restaurant_id, date, time) VALUES(${id}, '${date}', '${time}')`);
  } catch (err) {
    throw err;
  }
};

const updateReservation = async (id, date, time) => {
  try {
    return await connection.query(`UPDATE reservations SET date='${date}', time='${time}' WHERE id=${id}`);
  } catch (err) {
    throw err;
  }
};

const deleteReservation = async (id) => {
  try {
    return await connection.query(`DELETE FROM reservations WHERE id=${id}`);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  /*
   * Returns the number of new daily bookings of a given restaurant
   */
  getDailyBookCount: async (id) => {
    try {
      const { rows } = await connection.query('SELECT bookings_today FROM restaurants WHERE id=$1', [id]);
      return rows;
    } catch (err) {
      throw err;
    }
  },
  /*
   * CRUD handler for reservations
   */
  manageBooking: (method, reservation) => {
    const {
      id,
      restaurantId,
      date,
      time,
    } = reservation;
    switch (method) {
      case 'GET':
        return getAvailableTimes(restaurantId, date, time);
      case 'POST':
        return postReservation(restaurantId, date, time);
      case 'PUT':
        return updateReservation(id, date, time);
      case 'DELETE':
        return deleteReservation(id);
      default:
    }
    return new Error('this is a boat, but it could also be a teapot');
  },
};
