FROM node:14-alpine as build
# FROM node
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
ENV REACT_APP_URL_API_DEV=https://api.aviolog.com/api/v1 \
    REACT_APP_URL_API_PROD=https://api.aviolog.com/api/v1/
    # REACT_APP_URL_API_PROD=https://flightsmart.api/api/v1/
#EXPOSE 3000
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

#CMD ["npm", "run", "start"]