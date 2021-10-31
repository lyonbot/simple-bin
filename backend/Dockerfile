FROM node:14

WORKDIR /code
EXPOSE 3000

ADD package.json package-lock.json /code/
RUN npm install

ADD . /code/
ENTRYPOINT ["/bin/bash", "-c", "npm run start"]
