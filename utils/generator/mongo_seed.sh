RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

mongo reservations --eval "db.restaurants.drop()"

echo -e "${RED}Inserting restaurant data into database${NC}"
mongoimport -d reservations -c restaurants --type csv --file ./database/restaurants.csv --fields id,max_party_size,max_days_to_book,has_rewards,time_slot_interval,start_hour,end_hour,bookings_today
mongo reservations --eval "db.restaurants.createIndex({id:1})"

echo "" 

mongo reservations --eval "db.reservations.drop()"

echo -e "${RED}Inserting reservation data into database${NC}"
mongoimport -d reservations -c reservations --type csv --file ./database/reservations.csv --fields id,restaurant_id,date,time
mongo reservations --eval "db.reservations.createIndex({id:1})"
mongo reservations --eval "db.reservations.createIndex({restaurant_id:'hashed'})"


echo ""

echo -e "${RED}mongo seeding ok${NC}"