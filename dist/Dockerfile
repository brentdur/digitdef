FROM ubuntu:14.04
RUN sudo apt-get update
RUN sudo mkdir -p /src/app
RUN sudo apt-get install -y curl
RUN sudo apt-get install -y git
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN sudo apt-get install -y nodejs
RUN sudo apt-get install -y build-essential
COPY public/ /src/app/public/
COPY server/ /src/app/server/
COPY package.json /src/app/
RUN cd /src/app && npm install
EXPOSE 9005

ENV NODE_ENV=production PORT=9005
CMD ["node", "/src/app/server/app.js"] 
