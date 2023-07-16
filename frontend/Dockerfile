FROM node:20.4.0
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /taskly-frontend
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm clean-install
COPY . .
RUN npm run build
