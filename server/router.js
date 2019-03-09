const parser = require('body-parser');
const router = require('express').Router();
const controller = require('./controller.js');

const bp = parser.json();

router.get('/load/:restaurantId', controller.load.get);
router.get('/query/:restaurantId/:date/:time', controller.bookings.get);
router.post('/book/:restaurantId/:date/:time', controller.bookings.post);
router.put('/update/:id', bp, controller.bookings.put);
router.delete('/delete/:id', bp, controller.bookings.delete);

module.exports = router;
