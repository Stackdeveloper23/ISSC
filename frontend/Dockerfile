# Etapa 1: Construcción
FROM node:20 AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
# Etapa 2: Servidor Apache
FROM httpd:2.4
COPY --from=builder /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
CMD ["httpd-foreground"]



