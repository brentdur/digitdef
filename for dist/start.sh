#!/bin/bash 
echo "Please enter port number"
read port
docker build -t digitdef . && docker run -v /home/bd/node-apps/data/db:/data/db --name mongo -d mongo mongod --smallfiles && docker run --name ddblog -v /home/bd/node-apps/data/db:/data/db --link mongo:mongo -p 9005:9005 digitdef 

