ARG NODE_VERSION=18.19.0
FROM node:${NODE_VERSION}-bookworm-slim
#FROM --platform=linux/amd64 node:${NODE_VERSION}-bookworm-slim

# create the server directory
WORKDIR /client

# setup pnpm
ARG PNPM_VERSION=8.15.3
RUN npm install -g pnpm@${PNPM_VERSION}

# install dependencies
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install

# copy source code
COPY . .

# build the app
RUN pnpm build

# expose the port
EXPOSE 3000

# run the server
CMD ["node", ".output/server/index.mjs"]
