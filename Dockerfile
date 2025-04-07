FROM node:22.13.1 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install

COPY . .
RUN npm run build

FROM node:22.13.1

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install 

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

COPY .env .env

CMD ["sh", "-c", "wait-port db:5432 && npx prisma migrate deploy && node dist/server.js"]

EXPOSE 4001