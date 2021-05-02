FROM node:12

WORKDIR /robert

COPY package*.json ./

RUN npm install

RUN apt-get update
RUN apt-get install sox -y
RUN apt-get install libsox-fmt-mp3 -y

COPY bin/* ./ 
COPY bin/assets/ ./assets 

CMD ["npm", "start"] 