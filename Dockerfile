# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Copy source and produce the production build
COPY . .
RUN npm run build


# ── Stage 2: Serve ────────────────────────────────────────────────────────────
FROM php:8.2-apache

# Enable Apache modules needed for SPA routing (.htaccess) and asset caching
RUN a2enmod rewrite expires headers

# Install msmtp so PHP mail() works via an external SMTP relay
RUN apt-get update \
    && apt-get install -y --no-install-recommends msmtp ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Point PHP mail() at msmtp
RUN echo 'sendmail_path = "/usr/bin/msmtp -t --read-envelope-from"' \
    >> /usr/local/etc/php/conf.d/mail.ini

# Allow .htaccess overrides — required for React Router SPA fallback
RUN sed -i 's|AllowOverride None|AllowOverride All|g' /etc/apache2/apache2.conf

# Copy the Vite production build (includes .htaccess + send-inquiry.php from /public)
COPY --from=builder /app/dist /var/www/html

# Entrypoint writes /etc/msmtprc from env vars at container start
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
