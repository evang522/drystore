FROM node:10.15.0

WORKDIR /drystore

# Bundle app source
COPY . /drystore

RUN npm install -g nodemon
RUN npm ci    