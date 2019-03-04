RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -n "Enter your postgres username and press [ENTER]: "
read psql_user
echo -n "Enter your postgres password and press [ENTER]: "
read -s psql_pass

runPsqlCommand() {
  export PGPASSWORD=$psql_pass
  { psql -d reservations -U $psql_user -c "DISCARD PLANS"; } &> /dev/null
  psql -d reservations -U $psql_user -c "${1}"
}

echo ""

echo -e "${RED}----------SETUP-----------${NC}"
runPsqlCommand "SELECT setval('reservations_id_seq', 10000000)"

echo -e "${RED}------READ BENCHMARK------${NC}"
runPsqlCommand "EXPLAIN ANALYZE SELECT * FROM reservations WHERE restaurant_id=9923421"

echo -e "${RED}-----INSERT BENCHMARK-----${NC}"
runPsqlCommand "EXPLAIN ANALYZE INSERT INTO reservations(restaurant_id, date, time) VALUES(7432942, '2019-04-12', '18:45:00')"

echo -e "${RED}-----UPDATE BENCHMARK-----${NC}"
runPsqlCommand "EXPLAIN ANALYZE UPDATE reservations SET time='18:15:00' WHERE id=10000001"

echo -e "${RED}-----DELETE BENCHMARK-----${NC}"
runPsqlCommand "EXPLAIN ANALYZE DELETE FROM reservations WHERE id=10000001"

