// TODO: Import db here, and do things with it in exports
const connection = require('../database');

module.exports = {
  /*
   * Returns the number of new daily bookings of a given restaurant
   */
  getDailyBookCount: async (id) => {
    // TODO: query with connection
  },
  /*
   * CRUD handler for reservations
   */
  manageBooking: async (id, date, time, method, partySize) => {
    // TODO: query with connection
  },
};
