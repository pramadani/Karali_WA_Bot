FROM node:latest

RUN apt-get update

RUN apt-get install -y --no-install-recommends ffmpeg
RUN apt-get install -y --no-install-recommends ca-certificates
RUN apt-get install -y --no-install-recommends fonts-liberation
RUN apt-get install -y --no-install-recommends libasound2
RUN apt-get install -y --no-install-recommends libatk-bridge2.0-0
RUN apt-get install -y --no-install-recommends libatk1.0-0
RUN apt-get install -y --no-install-recommends libc6
RUN apt-get install -y --no-install-recommends libcairo2
RUN apt-get install -y --no-install-recommends libcups2
RUN apt-get install -y --no-install-recommends libdbus-1-3
RUN apt-get install -y --no-install-recommends libexpat1
RUN apt-get install -y --no-install-recommends libfontconfig1
RUN apt-get install -y --no-install-recommends libgbm1
RUN apt-get install -y --no-install-recommends libgcc1
RUN apt-get install -y --no-install-recommends libglib2.0-0
RUN apt-get install -y --no-install-recommends libgtk-3-0
RUN apt-get install -y --no-install-recommends libnspr4
RUN apt-get install -y --no-install-recommends libnss3
RUN apt-get install -y --no-install-recommends libpango-1.0-0
RUN apt-get install -y --no-install-recommends libpangocairo-1.0-0
RUN apt-get install -y --no-install-recommends libstdc++6
RUN apt-get install -y --no-install-recommends libx11-6
RUN apt-get install -y --no-install-recommends libx11-xcb1
RUN apt-get install -y --no-install-recommends libxcb1
RUN apt-get install -y --no-install-recommends libxcomposite1
RUN apt-get install -y --no-install-recommends libxcursor1
RUN apt-get install -y --no-install-recommends libxdamage1
RUN apt-get install -y --no-install-recommends libxext6
RUN apt-get install -y --no-install-recommends libxfixes3
RUN apt-get install -y --no-install-recommends libxi6
RUN apt-get install -y --no-install-recommends libxrandr2
RUN apt-get install -y --no-install-recommends libxrender1
RUN apt-get install -y --no-install-recommends libxss1
RUN apt-get install -y --no-install-recommends libxtst6
RUN apt-get install -y --no-install-recommends libu2f-udev
RUN apt-get install -y --no-install-recommends lsb-release
RUN apt-get install -y --no-install-recommends wget
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y --no-install-recommends xdg-utils
RUN apt-get install -y --no-install-recommends build-essential
RUN apt-get install -y --no-install-recommends libcairo2-dev
RUN apt-get install -y --no-install-recommends libpango1.0-dev
RUN apt-get install -y --no-install-recommends libjpeg-dev
RUN apt-get install -y --no-install-recommends libgif-dev
RUN apt-get install -y --no-install-recommends librsvg2-dev

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb || apt-get install -f -y
RUN rm google-chrome-stable_current_amd64.deb

RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*

WORKDIR /app