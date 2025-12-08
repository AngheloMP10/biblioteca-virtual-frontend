# ===== STAGE 1: Build Angular =====
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production


# ===== STAGE 2: Nginx =====
FROM nginx:alpine

# Elimina config por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copia nuestra configuración
COPY nginx.conf /etc/nginx/conf.d

# Copia el build de Angular al servidor web
COPY --from=build /app/dist/biblioteca-front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]