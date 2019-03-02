RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -e "${RED}Inserting restaurant data into database${NC}"
mongoimport -d reservations -c restaurants --type csv --file ./database/restaurants.csv --fields id,max_party_size,max_days_to_book,has_rewards,time_slot_interval,start_hour,end_hour,bookings_today

echo "" 

echo -e "${RED}Inserting reservation data into database${NC}"
mongoimport -d reservations -c reservations --type csv --file ./database/reservations.csv --fields id,restaurant_id,date,time

echo ""

echo -e "${RED}mongo seeding ok${NC}"