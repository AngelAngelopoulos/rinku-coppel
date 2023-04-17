# Establecer la imagen base para construir la aplicación
FROM node:14 as builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y el archivo package-lock.json a la imagen
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm ci

# Copiar el código fuente de la aplicación a la imagen
COPY . .

# Compilar la aplicación en modo producción
RUN npm run build --prod

# Crear una nueva imagen para servir la aplicación con un servidor web ligero
FROM nginx:1.21.3-alpine

# Copiar los archivos de configuración del servidor web a la imagen
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados de la aplicación a la imagen
COPY --from=builder /app/dist/frontend-rinku /usr/share/nginx/html

COPY ./frontend_docs /usr/share/nginx/html/frontend/docs
COPY ./backend_docs /usr/share/nginx/html/backend/docs

# Exponer el puerto 80 para que la aplicación sea accesible desde el exterior
EXPOSE 80

# Comando para iniciar el servidor web de nginx
CMD ["nginx", "-g", "daemon off;"]
