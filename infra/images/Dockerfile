FROM nginx

# Copy the nginx configuration file.
COPY nginx.conf /etc/nginx/nginx.conf

# create log dir configured in nginx.conf
RUN mkdir -p /var/log/iridium


ADD dist/customer-dashboard /usr/share/nginx/www/customer-dashboard


CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
