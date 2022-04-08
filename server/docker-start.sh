#!/bin/sh

# Update the prisma config if DATABASE_TYPE is set and is not mysql
if [ -n "$DATABASE_TYPE" ] && [ "$DATABASE_TYPE" != "mysql" ]; then
  echo "Updating prisma config"
  sed -i "s/mysql/$DATABASE_TYPE/g" /home/node/app/prisma/schema.prisma

  # Run prisma generate until output does not contain "Error: P1001"
  while true; do
    prisma generate && break
    echo "Failed to generate prisma schema, retrying..."
    sleep 5
  done
fi

# Make sure database is up to date
echo "Updating database..."
prisma db push

# Start the server
echo "Starting server..."
npm run prod