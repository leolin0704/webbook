FROM node:12.18.3

RUN cp /etc/apt/sources.list /etc/apt/sources.list.bak

RUN echo "deb http://mirrors.aliyun.com/ubuntu/ xenial main \
deb-src http://mirrors.aliyun.com/ubuntu/ xenial main \
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main \
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main \
deb http://mirrors.aliyun.com/ubuntu/ xenial universe \
deb-src http://mirrors.aliyun.com/ubuntu/ xenial universe \
deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe \
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates universe \
deb http://mirrors.aliyun.com/ubuntu/ xenial-security main \
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main \
deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe \
deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security universe" > /etc/apt/sources.list
 

RUN apt-get update \
&& apt-get install -y wget unzip fontconfig locales gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
&& apt-get install -y python build-essential && rm -rf /var/lib/apt/lists/*

WORKDIR /work

COPY . /work

RUN npm install
RUN npm install puppeteer --unsafe-perm=true --allow-root

RUN npm run build
EXPOSE 9527

CMD ["sh", "-c", "npx pm2 start ./dist/index.js --name roadbook --no-daemon"]
