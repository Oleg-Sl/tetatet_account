FROM node:alpine
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# docker build -t frontend_app .
# docker run -d --name frontend -p 3000:3000 frontend_app
