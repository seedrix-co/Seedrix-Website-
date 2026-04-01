#!/bin/sh
set -e

# If SMTP_HOST is set, write the msmtp config so PHP mail() can relay outbound email.
# Required env vars:  SMTP_HOST, SMTP_USER, SMTP_PASS
# Optional env vars:  SMTP_PORT (default 587), SMTP_FROM (default info@seedrix.co)
if [ -n "$SMTP_HOST" ]; then
  cat > /etc/msmtprc <<EOF
defaults
auth           on
tls            on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile        /proc/1/fd/1

account        default
host           ${SMTP_HOST}
port           ${SMTP_PORT:-587}
from           ${SMTP_FROM:-info@seedrix.co}
user           ${SMTP_USER}
password       ${SMTP_PASS}
EOF
  chmod 600 /etc/msmtprc
fi

exec "$@"
