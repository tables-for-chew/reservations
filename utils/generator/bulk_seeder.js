const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const {
  createReservation,
  createRestaurant,
} = require('./seed_util.js');

const restaurantPath = path.resolve(__dirname, '../../database/restaurants.csv');
const reservationPath = path.resolve(__dirname, '../../database/reservations.csv');

class DataGenerator extends Readable {
  constructor(generator) {
    super();

    this.records = 10000000; // 10 million
    this.completeRecords = 0;
    this.rows = '';
    this.generator = generator;
  }

  _read() {
    const chunk = this.completeRecords + 100;
    if (this.completeRecords === this.records) {
      this.push(null);
    } else {
      for (let i = this.completeRecords; i < chunk; i += 1) {
        this.rows += this.generator(i + 1, this.records);
        this.completeRecords += 1;
      }
      this.push(this.rows);
      this.rows = '';
    }
  }
}

// eslint-disable-next-line no-console
console.log('Generating information for restaurants...');
const restaurantFile = fs.createWriteStream(restaurantPath);
const restaurantGenerator = new DataGenerator(createRestaurant);
restaurantGenerator.pipe(restaurantFile);

// eslint-disable-next-line no-console
console.log('Generating information for reservations...');
const reservationFile = fs.createWriteStream(reservationPath);
const reservationGenerator = new DataGenerator(createReservation);
reservationGenerator.pipe(reservationFile);
