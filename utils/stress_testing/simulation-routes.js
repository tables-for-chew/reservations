/* eslint-disable */
const moment = require('moment');

const generateRandomNumber = (min, max) => { // inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = (months) => {
  const today = new Date();
  const max = new Date();
  max.setMonth(today.getMonth() + months);
  const randomDate = new Date(today.getTime() + Math.random() * (max.getTime() - today.getTime()));
  return moment(randomDate).format('YYYY-MM-DD');
};

function generateRandomData(userContext, events, done) {
  const restaurantId = generateRandomNumber(1, 10000000);
  const date = getRandomDate(3);
  const time = `${generateRandomNumber(0, 23)}:${generateRandomNumber(0, 3) * 15}`;

  userContext.vars.restaurantId = restaurantId;
  userContext.vars.date = date;
  userContext.vars.time = time;

  done();
}

module.exports = {
  generateRandomData,
}
