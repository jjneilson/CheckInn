# build stage
FROM node:lts-alpine as build-stage
ARG VITE_API_URL
ARG VITE_GOOGLE_MAPS_API_KEY
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN VITE_API_URL=$VITE_API_URL VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY npm run build


# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


