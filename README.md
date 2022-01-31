# Portfolio Site Content
[![Node.js CI](https://github.com/pritamprasd/portfolio/actions/workflows/node.js.yml/badge.svg)](https://github.com/pritamprasd/portfolio/actions/workflows/node.js.yml)

key-mgmt:
- export ENCRYPTION_KEY=$(pwgen 32 1)
- openssl aes-256-cbc -in .github/workflows/secrets/id_rsa -out .github/workflows/secrets/id_rsa.enc -pass pass:$ENCRYPTION_KEY -e -md sha1 
- 