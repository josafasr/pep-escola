FROM node:14

USER node

WORKDIR /home/node

# RUN ["npm", "cache", "clean", "--force"]

COPY --chown=node:node ["package.json", "./"]

RUN ["npm", "install"]

COPY --chown=node:node ./ ./
