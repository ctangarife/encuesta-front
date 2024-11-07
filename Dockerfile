FROM node:20.9.0
WORKDIR /usr/src/app
EXPOSE 3000
CMD [ "npm", "run", "dev" ]