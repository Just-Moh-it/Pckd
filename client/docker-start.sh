#!/usr/bin/env sh

# check if not BACKEND_URL is set
# if it is not set, default to 'http://server:4000'
if [ -z "$BACKEND_URL" ]; then
    set BACKEND_URL="http://server:4000"
fi

# Run envsubst on the template
# Only set ${BACKEND_URL}
envsubst '${BACKEND_URL}' < /etc/nginx/conf.d/default.conf.tmp > /etc/nginx/conf.d/default.conf
rm /etc/nginx/conf.d/default.conf.tmp

# Run nginx
exec "$@"