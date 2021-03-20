#!/bin/bash

docker build --rm -t frontend-builder -f ./blue-drive-front/docker/Dockerfile .
docker create -it --init --name bob-budowniczy frontend-builder
docker cp bob-budowniczy:/usr/src/BlueDrive/frontend/public ./blue-drive-front/
docker rm bob-budowniczy
docker rmi frontend-builder