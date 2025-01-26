FROM node:20-alpine

WORKDIR /app

CMD [ -d "node_modules" ] && npm run start || npm i && npm run start