FROM node:18-alpine
WORKDIR frontendadmin

COPY package.json .
COPY vite.config.ts .
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]