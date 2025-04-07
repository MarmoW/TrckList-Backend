FROM node:22.13.1 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22.13.1

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

COPY .env .env

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]

EXPOSE 4001