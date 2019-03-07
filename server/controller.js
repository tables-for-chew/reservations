const {
  getDailyBookCount,
  manageBooking,
} = require('./model.js');

module.exports = {
  /*
   * Handles requests for number of bookings per day
   *
   * Request parameters:
   *  restaurantId - int
   */
  load: {
    get: async (req, res) => {
      const { restaurantId } = req.params;
      try {
        const bookingCount = await getDailyBookCount(restaurantId);
        res.status(200).send(bookingCount);
      } catch (err) {
        res.status(418).send(err); // TODO: i'm a teapot
      }
    },
  },
  /*
   * Handles CRUD requests for reservations
   *
   * Request parameters:
   *  restaurantId - int
   *  date: string (format: 'YYYY-MM-DD')
   *  time: string (format: 'HH:mm')
   */
  bookings: {
    /*
     * Gets available times within given time period, give or take 2 hours
     */
    get: async (req, res) => {
      const {
        restaurantId,
        date,
        time,
      } = req.params;
      try {
        const result = await manageBooking('GET', { restaurantId, date, time });
        res.status(200).send(result);
      } catch (err) {
        res.status(418).send(err); // TODO: i'm a teapot
      }
    },
    /*
     * Books a reservation with newTime at the specified time
     */
    post: async (req, res) => {
      const {
        restaurantId,
        date,
        time,
      } = req.params;
      try {
        const result = await manageBooking('POST', { restaurantId, date, time });
        res.status(201).send(result);
      } catch (err) {
        res.status(418).send(err); // TODO: i'm a teapot
      }
    },
    /*
     * Updates a reservation given an id
     */
    put: async (req, res) => {
      const { id } = req.params;
      const {
        restaurantId,
        date,
        time,
      } = req.body;
      try {
        const result = await manageBooking('PUT', { id, restaurantId, date, time });
        res.status(204).send(result);
      } catch (err) {
        res.status(418).send(err); // TODO: i'm a teapot
      }
    },
    /*
     * Deletes a reservation with partySize at the specified time
     */
    delete: async (req, res) => {
      const { id } = req.params;
      try {
        const result = await manageBooking('DELETE', { id });
        res.status(204).send(result);
      } catch (err) {
        res.status(418).send(err); // TODO: i'm a teapot
      }
    },
  },
};
