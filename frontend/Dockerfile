FROM nginx:alpine

LABEL maintainer="Ramesh Mamuduru"
LABEL description="Dockerfile for Frontend of E-commerce App"

# Remove default nginx content
#RUN rm -rf /usr/share/nginx/html/*

# Copy your web files
#COPY . /usr/share/nginx/html

COPY . /var/www/html
COPY nginx/shopapp.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
