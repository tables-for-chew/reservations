RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -n "Enter your postgres username and press [ENTER]: "
read psql_user
echo -n "Enter your postgres password and press [ENTER]: "
read -s psql_pass

echo ""

echo -e "${RED}Creating database schema${NC}"
export PGPASSWORD=$psql_pass
psql -U $psql_user -f ./utils/generator/postgres_schema.sql

echo ""

echo -e "${RED}Inserting generated data into database${NC}"
export PGPASSWORD=$psql_pass
psql -U $psql_user -a -f ./utils/generator/postgres_import.sql

echo ""

echo -e "${RED}postgres seeding ok${NC}"