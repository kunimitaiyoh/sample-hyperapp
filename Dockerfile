FROM nginx:1.13

RUN apt-get update \
    && apt-get install -y curl gnupg \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs

RUN mkdir /usr/src/sample
COPY package.json /usr/src/sample
COPY package-lock.json /usr/src/sample
WORKDIR /usr/src/sample
RUN npm install
COPY . /usr/src/sample

RUN npm run build
RUN cp -R dist/* /usr/share/nginx/html

# command: ["nginx", "-g", "daemon off;"]
