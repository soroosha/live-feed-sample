#!/bin/sh

# Entrypoint script to run in server container

# this is needed in dev as docker-compose database service may take longer than Django to start up
echo "Waiting for postgres..."
while ! nc -z $SQL_HOST $SQL_PORT; do
  sleep 0.1
done
echo "PostgreSQL started"

# Apply migrations (if any) and start development server
cd app
pipenv run python manage.py migrate
pipenv run python manage.py runserver 0.0.0.0:80