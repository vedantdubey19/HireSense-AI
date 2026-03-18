FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Install serve to run the build output
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
