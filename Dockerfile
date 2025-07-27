FROM node

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=qwerty

RUN mkdir -p demo-website

COPY . /demo-website

CMD ["node", "/demo-websiteserver.js"]



