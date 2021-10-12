FROM node:14 as builder
USER node
WORKDIR /home/node

COPY --chown=node:node . .
RUN ["npm", "install"]
COPY --chown=node:node . .
RUN ["npm", "run", "build"]
# RUN find . ! -name dist ! -name node_modules -maxdepth 1 -mindepth 1 -exec rm -rf {} \;

FROM node:14
USER node
WORKDIR /home/node
COPY --chown=node:node --from=builder /home/node .
# CMD ["node", "dist/index.js"]