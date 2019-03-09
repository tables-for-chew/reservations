const connection = require('../database');

const getAvailableTimes = async (id, date, time) => {
  try {
    const query = `SELECT rt.time_slot_interval, rv.time, rv.date \
                  FROM restaurants AS rt LEFT JOIN reservations AS rv \
                  ON (rv.restaurant_id=rt.id) \
                  WHERE rt.id=${id}`;
    const { rows } = await connection.query(query);
    const reservedTimes = rows
      .filter(row => row.date && row.date.toISOString().substring(0, 10) === date)
      .map((row) => {
        const [h, m] = row.time.split(':');
        // eslint-disable-next-line no-bitwise
        return (h * 60) + ~~m;
      });
    const window = Number(rows[0].time_slot_interval.split(':')[1]);

    const [hours, minutes] = time.split(':');
    let timeInMinutes = (hours * 60) + (minutes - 150);
    const resWindow = timeInMinutes + 300;

    const queryTimes = [];
    while (timeInMinutes <= resWindow) {
      if (!reservedTimes.includes(timeInMinutes)) {
        // eslint-disable-next-line no-bitwise
        const hm = `${~~(timeInMinutes / 60)}:${timeInMinutes % 60}`;
        queryTimes.push(hm);
      }
      timeInMinutes += window;
    }

    return queryTimes;
  } catch (err) {
    throw err;
  }
};

const postReservation = async (id, date, time) => {
  try {
    await connection.query(`INSERT INTO reservations(restaurant_id, date, time) VALUES(${id}, '${date}', '${time}')`);
    await connection.query(`UPDATE restaurants SET bookings_today = bookings_today+1 WHERE id=${id}`);
    return;
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
