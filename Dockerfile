FROM node:20.11.1 AS debug

WORKDIR /app

RUN rm -rf node_modules package-lock.json

# Copy package.json and tsconfig.json
COPY ./package*.json ./
COPY ./tsconfig.json ./

# Installing dependencies
RUN npm install

# Install pm2 globally
RUN npm install -g pm2 nodemon

# Copying all the files in our project
COPY . .

# Building the project
RUN npm run build

# Exposing server port
EXPOSE 12098

# Declaring env
ENV NODE_ENV=development

ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0", "./build/server.js" ]

# FROM node:20.11.1 AS prod

# WORKDIR /app

# RUN rm -rf node_modules package-lock.json

# # Copy package.json and tsconfig.json
# COPY ./package*.json ./
# COPY ./tsconfig.json ./

# # Installing dependencies
# RUN npm install

# # Install pm2 globally
# RUN npm install -g pm2

# # Copying all the files in our project
# COPY . .

# # Building the project
# RUN npm run build

# # Exposing server port
# EXPOSE 12098

# # Declaring env
# ENV NODE_ENV=production

# # Starting the application with pm2
# CMD [ "pm2-runtime", "ecosystem.config.js" ]
