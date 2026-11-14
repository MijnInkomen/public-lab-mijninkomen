FROM node:24-alpine
WORKDIR ./app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev &&\
    mkdir ./opslag &&\
    chown node:node ./opslag

USER node
COPY example.json ./opslag/
COPY src ./src

EXPOSE 4000
CMD ["node", "src/index.ts"]
