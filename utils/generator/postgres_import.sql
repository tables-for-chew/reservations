\c reservations;

\copy restaurants FROM './database/restaurants.csv' DELIMITERS ',' CSV;
\copy reservations FROM './database/reservations.csv' DELIMITERS ',' CSV;

CREATE INDEX ON reservations(restaurant_id);
SELECT setval('reservations_id_seq', 10000000);
SELECT setval('restaurants_id_seq', 10000000);