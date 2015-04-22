#!/bin/bash 
echo "Please enter port number"
read port
cd dist
docker build -t digitdef && mkdir -p data/db && docker run -v "$(pwd)”/data:/data --name mongo -d mongo mongod --smallfiles && docker run --name node -v "$(pwd)”/data:/data --link mongo:mongo -p $port:$port digitdef 

