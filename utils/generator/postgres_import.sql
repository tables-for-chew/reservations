\c reservations;

\copy restaurants FROM './database/restaurants.csv' DELIMITERS ',' CSV;
\copy reservations FROM './database/reservations.csv' DELIMITERS ',' CSV;