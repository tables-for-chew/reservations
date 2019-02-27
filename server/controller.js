const {
  getDailyBookCount,
  manageBooking,
} = require('./model.js');

module.exports = {
  load: {
    // restaurantId
    get: async (req, res) => {
      // TODO: Do the thing with model here
      const { restaurantId } = req.params;
      try {
        const bookingCount = await getDailyBookCount(restaurantId);
        res.status(200).send(bookingCount);
      } catch (err) {
        res.status(418).send(err); // TODO: i'm a teapot
      }
    },
  },
  bookings: {
    // restaurantId,
    // date: [YYYY-MM-DD],
    // time: [HH:mm]
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
