FROM centos:7

RUN yum -y update

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -

RUN yum clean all && yum makecache fast
RUN yum install -y gcc-c++ make
RUN yum install -y nodejs

RUN yum install -y alsa-lib.x86_64 \
atk.x86_64 \
cups-libs.x86_64 \
gtk3.x86_64 \
ipa-gothic-fonts \
libXcomposite.x86_64 \
libXcursor.x86_64 \
libXdamage.x86_64 \
libXext.x86_64 \
libXi.x86_64 \
libXrandr.x86_64 \
libXScrnSaver.x86_64 \
libXtst.x86_64 \
pango.x86_64 \
xorg-x11-fonts-100dpi \
xorg-x11-fonts-75dpi \
xorg-x11-fonts-cyrillic \
xorg-x11-fonts-misc \
xorg-x11-fonts-Type1 \
xorg-x11-utils

RUN yum groupinstall -y "fonts"

RUN yum update nss -y

WORKDIR /work
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install puppeteer@5.2.1 --unsafe-perm=true --allow-root

COPY package*.json /work/
RUN cnpm install

COPY . /work

RUN npm run build
EXPOSE 9527

CMD ["sh", "-c", "npx pm2 start ./dist/index.js --name roadbook --no-daemon"]
