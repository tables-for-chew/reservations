# TODO: REFACTOR LATER TO HAVE DATA GENERATION SEPARATE FROM SEEDING

RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -n "Enter your postgres username and press [ENTER]: "
read psql_user
echo -n "Enter your postgres password and press [ENTER]: "
read -s psql_pass

echo ""

echo -e "${RED}Removing any existing data, if it exists${NC}"
rm ./database/*.csv

echo ""

SECONDS=0

echo -e "${RED}Beginning data generation script${NC}"
node ./generator/bulk_seeder.js

echo ""

echo -e "${RED}Creating database schema${NC}"
export PGPASSWORD=$psql_pass
psql -U $psql_user -f ./generator/postgres_schema.sql

echo ""

echo -e "${RED}Inserting freshly created data into database${NC}"
export PGPASSWORD=$psql_pass
psql -U $psql_user -a -f ./generator/postgres_import.sql

echo ""

echo -e "${RED}seeding complete in ${YELLOW}$SECONDS ${RED}seconds${NC}"