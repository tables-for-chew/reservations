FROM node:6.13.1

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install
RUN npm run build

EXPOSE 3003

CMD ["npm", "run", "server"]