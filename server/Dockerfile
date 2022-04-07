FROM node:16-alpine

# Dependencies
RUN apk add --no-cache dos2unix
RUN npm install -g nodemon prisma

# Start script
COPY --chown=node:node ./docker-start.sh /entrypoint.sh
RUN dos2unix /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Create workdir
WORKDIR /home/node/app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the rest of the app
COPY . .

# Generate prisma
RUN prisma generate

# Set permissions
RUN chown -R node:node .
USER node

# Environment
ENV NODE_ENV production
ENV PORT 4000
EXPOSE 4000

ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
