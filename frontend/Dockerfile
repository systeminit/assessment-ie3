FROM node:20.4.0
WORKDIR /taskly-ui
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm clean-install
COPY . .
RUN npm run build
