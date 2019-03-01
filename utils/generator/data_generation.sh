RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

# Remove any pre-existing data
rm ./database/*.csv

SECONDS=0

echo -e "${RED}Beginning data generation script${NC}"
node ./utils/generator/bulk_seeder.js

echo ""

echo -e "${RED}data generation complete: ${YELLOW}$SECONDS ${RED} seconds${NC}"