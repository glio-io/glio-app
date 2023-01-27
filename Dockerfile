### BUIlD VUE PROJECT
FROM node:14.0.0-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

###NGINX server
FROM nginx:1.21.1-alpine AS prod-stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 82
CMD ["nginx", "-g", "daemon off;"]