#!/bin/bash 
echo "Please enter port number"
read port
docker run -d --name ddblog -v /home/bd/node-apps/data/db:/data/db --link mongo:mongo -p 9005:9005 digitdef 

