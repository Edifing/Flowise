# Build local monorepo image
# docker build --no-cache -t  flowise .

# Run image
# docker run -d -p 3000:3000 flowise

# USAREMOS UNA IMAGEN MÁS COMPATIBLE (DEBIAN SLIM EN LUGAR DE ALPINE)
FROM node:20-slim

# Install dependencies needed for Playwright
RUN apt-get update && apt-get install -yq libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss1 --no-install-recommends

# Install curl for container-level health checks
RUN apt-get install -yq curl --no-install-recommends

# Install PNPM globally
RUN npm install -g pnpm

# Tell Playwright to use the browsers we install
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PLAYWRIGHT_BROWSERS_PATH=/usr/bin/playwright

WORKDIR /usr/src

# Copy app source
COPY . .

# Install app dependencies
RUN pnpm install

# Install Playwright browsers
RUN npx playwright install --with-deps

# Build the app
RUN pnpm build

EXPOSE 3000

CMD [ "pnpm", "start" ]
