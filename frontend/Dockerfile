FROM node:18-alpine
WORKDIR /src
COPY package.json .
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

# docker build -t frontend_app .
# docker run -d --name frontend -p 3000:3000 frontend_app
