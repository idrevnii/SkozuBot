FROM node:16

WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./

RUN npm install
COPY . .
RUN npm run build

RUN npm install --production

ARG TOKEN
ENV TOKEN=$TOKEN

CMD [ "node", "build/index.js" ]
