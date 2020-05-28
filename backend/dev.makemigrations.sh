#!/bin/bash

###
# PURPOSE: Convenience script to update migration files (<app>/migrations/) based on current models
# USAGE: ./dev.makemigrations.sh
#
# Attached Docker volume will reflect changes from container back to host automatically
###

docker exec -it sample-fs-app_backend_1 pipenv run python app/manage.py makemigrations
