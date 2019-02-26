let seedRestaurants = n => {
  var commands = '';

  for (var i = 0; i < n; i++) {
    let maxPartySize = Math.round(Math.random() * 16 + 4);
    let maxDaysToBook = Math.round(Math.random() * 83 + 7);
    let hasRewards = Math.round(Math.random());
    if (Math.round(Math.random())) {
      var timeSlotInterval = '00:15:00';
    } else {
      var timeSlotInterval = '00:30:00';
    }
    let startHour = '17:00';
    let endHour = '22:00';
    let bookingsToday = Math.round(Math.random() * 150);

    var insert = `INSERT INTO restaurants (max_party_size, max_days_to_book, has_rewards, time_slot_interval, start_hour, end_hour, bookings_today) VALUES (${maxPartySize}, ${maxDaysToBook}, ${hasRewards}, '${timeSlotInterval}', '${startHour}', '${endHour}', ${bookingsToday});`;
    commands += insert;
  }

  return commands.replace(/;/gi, ';\n');
};

// n should be same as input to seedRestaurants
let seedReservations = n => {
  var commands = '';

  for (var i = 1; i <= n; i++) {
    let restaurantId = i;
    let date = '2019-02-14';
    let time = '19:00';

    var insert = `INSERT INTO reservations (restaurant_id, date, time) VALUE (${restaurantId}, '${date}', '${time}');`;
    commands += insert;
  }
  return commands.replace(/;/gi, ';\n');
};
