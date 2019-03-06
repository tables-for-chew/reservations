RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo ""

runMongoCommand() {
  mongo reservations --eval "db.reservations.getPlanCache().clear()" > /dev/null
  { mongo reservations --eval "${1}"; } 2>&1 | grep \"executionTimeMillis\"
}

echo -e "${RED}------READ BENCHMARK------${NC}"
runMongoCommand "db.reservations.explain(\"executionStats\").find({restaurant_id:9923421})"

# echo -e "${RED}-----INSERT BENCHMARK-----${NC}"
# runMongoCommand "db.reservations.insert({'id': 10000001, 'restaurant_id': 7432942, 'date': '2019-04-12', 'time': '18:45:00'})"

echo -e "${RED}-----UPDATE BENCHMARK-----${NC}"
runMongoCommand "db.reservations.explain(\"executionStats\").update({id:10000000}, {'time': '18:15:00'})"

echo -e "${RED}-----DELETE BENCHMARK-----${NC}"
runMongoCommand "db.reservations.explain(\"executionStats\").remove({id:10000000})"

