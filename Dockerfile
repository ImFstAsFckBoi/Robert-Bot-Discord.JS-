FROM node:12

WORKDIR /robert

COPY package*.json ./

RUN npm install

COPY bin/* ./ 
COPY bin/assets/ ./assets 

CMD ["npm", "start"]