#!/bin/bash

###
# PURPOSE: Start/Restart API, React, and database services in dev environment
# USAGE: ./dev.run.sh [-r]
#           -r: reset database. Will recreate superuser.
###

APP_NAME="Live Feed Sample"

# exit script immediately on error
set -e
USAGE="Usage: ./dev.run.sh [-r]"
GREEN="\033[1;32m"
ORANGE="\033[1;33m"
NOCOLOR="\033[0m"

# check command option
reset_db=0
while getopts "r" opt; do
  case ${opt} in
    r ) # reset database
      reset_db=1
      ;;
    \? ) echo $USAGE
      ;;
  esac
done

if [ "$reset_db" -eq 1 ]; then
  echo -e "${ORANGE}\xE2\x98\x85 Resetting ${APP_NAME} database ...${NOCOLOR}"
  # remove docker volumes (database data, etc.) and restart services
  docker-compose -f dev.docker-compose.yml down -v
else
  # restart services without removing volumes
  echo -e "${ORANGE}\xE2\x98\x85 Restarting ${APP_NAME} ...${NOCOLOR}"
  docker-compose -f dev.docker-compose.yml down
fi

# restart services and run unit test
docker-compose -f dev.docker-compose.yml up --build -d

echo -e "${ORANGE}\xE2\x98\x85 Waiting for Django to start ...${NOCOLOR}"
while docker exec -t live-feed-sample_backend_1 nc -z localhost 80 ; [ $? -ne 0 ]; do
  sleep 0.1
done

# echo -e "${ORANGE}\xE2\x98\x85 Run backend tests ...${NOCOLOR}"
# docker exec -t live-feed-sample_backend_1 pipenv run python app/manage.py test

# echo -e "${ORANGE}\xE2\x98\x85 Run frontend tests ...${NOCOLOR}"
# docker exec -t -e CI=true live-feed-sample_backend_1 npm test

if [ "$reset_db" -eq 1 ]; then
  echo -e "${ORANGE}\xE2\x98\x85 Inserting initial data...${NOCOLOR}"
  # default fixtures data will be used (e.g. <app>/fixtures/)
  docker exec -it live-feed-sample_backend_1 pipenv run python app/manage.py loaddata initial_posts

  echo -e "\n${GREEN}\xE2\x9C\x93 Development services restarted with fresh database. ${NOCOLOR}"
else
  echo -e "\n${GREEN}\xE2\x9C\x93 Development services restarted. ${NOCOLOR}"
fi
