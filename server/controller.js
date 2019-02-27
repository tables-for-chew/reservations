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
        const result = await manageBooking(restaurantId, date, time, 'GET');
        res.status(200).send(result);
      } catch (err) {
        res.status(418).send(err); // TODO: i'm a teapot
      }
    },
    /*
     * Books a reservation with partySize at the specified time
     */
    post: async (req, res) => {
      const {
        restaurantId,
        date,
        time,
      } = req.params;
      const { partySize } = req.body;
      try {
        const result = await manageBooking(restaurantId, date, time, 'POST', partySize);
        res.status(201).send(result);
      } catch (err) {
        res.status(418).send(err); // TODO: i'm a teapot
      }
    },
    /*
     * Updates a reservation with partySize at the specified time
     */
    put: async (req, res) => {
      const {
        restaurantId,
        date,
        time,
      } = req.params;
      const { partySize } = req.body;
      try {
        const result = await manageBooking(restaurantId, date, time, 'PUT', partySize);
        res.status(204).send(result);
      } catch (err) {
        res.status(418).send(err); // TODO: i'm a teapot
      }
    },
    /*
     * Deletes a reservation with partySize at the specified time
     */
    delete: async (req, res) => {
      const {
        restaurantId,
        date,
        time,
      } = req.params;
      try {
        const result = await manageBooking(restaurantId, date, time, 'DELETE');
        res.status(204).send(result);
      } catch (err) {
        res.status(418).send(err); // TODO: i'm a teapot
      }
    },
  },
};
