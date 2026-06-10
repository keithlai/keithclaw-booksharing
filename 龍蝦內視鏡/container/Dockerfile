FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install --production

# Copy app
COPY server.js ./
COPY public/ ./public/

# Create log directory mount point
RUN mkdir -p /var/log/openclaw /var/log/app

EXPOSE 3000

CMD ["node", "server.js"]
