#!/bin/bash

while getopts ":v:" flag; do
  case "${flag}" in
  v) 
    grafanaVersion=${OPTARG};;
  :)
    grafanaVersion='latest'
  esac
done

if [ ! "$grafanaVersion" ]; then
  echo 'Specifying a grafana version with -v flag is required'
  exit
fi

NAME="grafana-$grafanaVersion"

echo $NAME

if [ "$(docker ps -q -f name=$NAME)" ]; then
  docker stop "$(docker ps -q -f name=$NAME)"
fi 

if [ "$(docker ps -aq -f name=$NAME)" ]; then
    # cleanup
    echo 'Deleting pre-existing container'
    docker rm $NAME
fi

echo 'Starting up'
# run your container
docker run \
  -d \
  -p 3000:3000 \
  -v "$(pwd):/var/lib/grafana/plugins/grafana-synthetic-monitoring-app" \
  -v "$(pwd)/scripts/local-provisioning:/etc/grafana/provisioning"  \
  -v "$(pwd)/scripts/custom.ini:/etc/grafana/grafana.ini"\
  --name="$NAME" \
  grafana/grafana:"$grafanaVersion"
