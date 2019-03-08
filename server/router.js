const router = require('express').Router();
const controller = require('./controller.js');

router.get('/load/:restaurantId', controller.load.get);
router.get('/query/:restaurantId/:date/:time', controller.bookings.get);
router.post('/query/:restaurantId/:date/:time', controller.bookings.post);
router.put('/query/:id', controller.bookings.put);
router.delete('/query/:id', controller.bookings.delete);

module.exports = router;
