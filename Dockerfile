FROM node:12

WORKDIR /robert

COPY package*.json ./

RUN npm i

COPY bin/* ./
CMD ["npm", "start"]