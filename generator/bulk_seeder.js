const fs = require('fs');
const path = require('path');
const moment = require('moment');

const {
  createReservation,
  createRestaurant,
} = require('./seed_util.js');

console.log(`Initializing: ${moment().format('MMMM Do YYYY, h:mm:ss')}`);

const restaurantPath = path.resolve(__dirname, '../database/restaurants.csv');
const reservationPath = path.resolve(__dirname, '../database/reservations.csv');

const records = 10000000;
const stepSize = 10000;

const seedRestaurants = () => {
  const stream = fs.createWriteStream(restaurantPath);
  let step;
  for (let i = 0; i < (records / stepSize); i += 1) {
    step = '';
    for (let j = 0; j < stepSize; j += 1) {
      const id = (i * stepSize) + j;
      step += createRestaurant(id);
    }
    stream.write(step);
  }
  stream.end();
};

const seedReservations = () => {
  const stream = fs.createWriteStream(reservationPath);
  let step;
  for (let i = 0; i < (records / stepSize); i += 1) {
    step = '';
    for (let j = 0; j < stepSize; j += 1) {
      const id = (i * stepSize) + j;
      const restaurantId = Math.floor(Math.random() * records);
      step += createReservation(id, restaurantId);
    }
    stream.write(step);
  }
  stream.end();
};

console.log('Generating restaurants...');
seedRestaurants();
console.log('Generating reservations...');
seedReservations();
console.log(`Finished generating: ${moment().format('MMMM Do YYYY, h:mm:ss')}`);
