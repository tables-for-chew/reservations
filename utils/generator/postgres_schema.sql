DROP DATABASE IF EXISTS reservations;
CREATE DATABASE reservations;

\c reservations;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  max_party_size INT,
  max_days_to_book INT,
  has_rewards BOOLEAN,
  time_slot_interval TIME,
  start_hour TIME,
  end_hour TIME,
  bookings_today INT
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  restaurant_id INT,
  date DATE,
  time TIME
);
