FROM node:16-alpine as builder

WORKDIR /home/node/build

# Install development dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --include=dev

# Build react application
COPY . .
RUN npm run build

# Use nginx to serve the react application
FROM nginx 

# Copy the react application
RUN rm -r /usr/share/nginx/html/*
RUN mkdir -p /usr/share/nginx/html/manage
COPY --from=builder /home/node/build/build /usr/share/nginx/html/manage

# Copy the nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf.tmp

# Copy the entrypoint script
COPY ./docker-start.sh /entrypoint.sh

EXPOSE 80
RUN chmod +x entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "nginx", "-g", "daemon off;" ]
