#!/bin/bash

docker build --rm -t gatsby -f ./blue-drive-front/docker/Dockerfile .
docker run -it --init -d -p 8090:8090 --name gatsby-serve gatsby
# docker cp gatsby-serve:/usr/src/BlueDrive/frontend/public ./blue-drive-front/
# docker rm gatsby-serve
# docker rmi gatsby