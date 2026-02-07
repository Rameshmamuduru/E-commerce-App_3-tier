FROM mysql:latest

LABEL maintainer="Ramesh Mamuduru"
LABEL description="Dockerfile for Frontend of E-commerce App"

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=rootpass
ENV MYSQL_DATABASE=shopdb
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=rootpass

COPY . /docker-entrypoint-initdb.d/

EXPOSE 3306