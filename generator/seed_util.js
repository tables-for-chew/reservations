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

module.exports = {
  createReservation: (id, records) => {
    const restaurantId = Math.floor(Math.random() * records) + 1;
    const date = getRandomDate(3);
    const time = `${generateRandomNumber(0, 23)}:${generateRandomNumber(0, 3) * 15}`;
    return `${id},${restaurantId},"${date}","${time}"\n`;
  },
  createRestaurant: (id) => {
    const maxParty = generateRandomNumber(4, 20);
    const maxBookDate = generateRandomNumber(7, 90);
    const hasRewards = generateRandomNumber(0, 1);
    const timeSlotInterval = `00:${generateRandomNumber(1, 2) * 15}:00`;
    const startHour = `${generateRandomNumber(0, 11)}:00`;
    const endHour = `${generateRandomNumber(12, 23)}:00`;
    const bookingsToday = generateRandomNumber(0, 150);
    return `${id},${maxParty},${maxBookDate},${hasRewards},"${timeSlotInterval}","${startHour}","${endHour}",${bookingsToday}\n`;
  },
};
