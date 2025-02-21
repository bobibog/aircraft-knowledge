# Stage 1: Build the React app
FROM node:14-alpine as build
# FROM node

# Define build-time variables
ARG REACT_APP_URL_API_DEV
ARG REACT_APP_URL_API_PROD

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json .
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# ENV REACT_APP_URL_API_DEV=https://api.aviolog.com/api/v1 \
#     REACT_APP_URL_API_PROD=https://api.aviolog.com/api/v1/
    # REACT_APP_URL_API_PROD=https://flightsmart.api/api/v1/
#EXPOSE 3000

# Build the app with the environment variables
RUN REACT_APP_URL_API_DEV=$REACT_APP_URL_API_DEV REACT_APP_URL_API_PROD=$REACT_APP_URL_API_PROD npm run build

# Stage 2: Serve the React app with a static server
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

#CMD ["npm", "run", "start"]