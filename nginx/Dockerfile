FROM node:14 as build

ARG FOOBAR=baz

WORKDIR /app

COPY ./package.json ./package-lock.json /app/
RUN npm install

COPY . .
RUN npm run build


FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
