# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Ambil Build Args dari Easypanel buat masukin ENV ke React
# Tambahin ARG lain kalau lu punya banyak Env (misal: VITE_API_URL)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve dengan Nginx
FROM nginx:stable-alpine

# Copy hasil build (pake 'dist' kalau Vite, 'build' kalau CRA)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy config Nginx custom kita
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix permissions biar Nginx gak gagal baca file (Fix MIME type "" issue)
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]