export COMPOSE_PROJECT_NAME=simple-bin-prod
export PORT=39100

docker-compose -f docker-compose.prod.yaml up --build -d
