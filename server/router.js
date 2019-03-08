const router = require('express').Router();
const controller = require('./controller.js');

router.get('/load/:restaurantId', controller.load.get);
router.get('/query/:restaurantId/:date/:time', controller.bookings.get);
router.post('/book/:restaurantId/:date/:time', controller.bookings.post);
router.put('/update/:id', controller.bookings.put);
router.delete('/delete/:id', controller.bookings.delete);

module.exports = router;
