FROM mcr.microsoft.com/playwright:v1.46.0-jammy

WORKDIR /home/jenkins

COPY package*.json ./
RUN npm ci || npm install

COPY . .
