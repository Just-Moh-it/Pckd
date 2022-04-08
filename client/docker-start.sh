#!/usr/bin/env sh

# check if not BACKEND_URL is set
# if it is not set, default to 'http://server:4000'
if [ -z "$BACKEND_URL" ]; then
    set BACKEND_URL="http://server:4000"
    echo "BACKEND_URL not set, defaulting to $BACKEND_URL"
fi

# Run envsubst on the template
if [ -f "/etc/nginx/conf.d/default.conf.tmp" ]; then
    echo "Setting up NGINX config"
    
    # Extract the host from the BACKEND_URL
    BACKEND_HOST=$(echo $BACKEND_URL | cut -d/ -f3 | cut -d: -f1)

    # Resolve $BACKEND_URL to an IP address
    echo "Resolving $BACKEND_HOST to an IP address..."
    BACKEND_IP=$(getent hosts $BACKEND_HOST | awk '{ print $1 }' | head -n1)
    echo "Resolved $BACKEND_HOST to $BACKEND_IP"

    # Substitute BACKEND_IP instead of the hostname in BACKEND_URL
    BACKEND_URL=$(echo $BACKEND_URL | sed "s/$BACKEND_HOST/$BACKEND_IP/g")
    echo "Substituted $BACKEND_HOST with $BACKEND_IP in $BACKEND_URL"

    # Run envsubst on the template
    envsubst '${BACKEND_URL}' < /etc/nginx/conf.d/default.conf.tmp > /etc/nginx/conf.d/default.conf
    rm /etc/nginx/conf.d/default.conf.tmp
fi

# Run nginx
echo "Starting NGINX..."
exec "$@"