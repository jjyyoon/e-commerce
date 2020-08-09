FROM node:10-alpine

# Back-end
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Front-end
WORKDIR /usr/src/app/client
RUN npm install
RUN npm run build

WORKDIR /usr/src/app
EXPOSE 5000
CMD ["npm", "start"]