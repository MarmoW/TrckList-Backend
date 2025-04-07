FROM node:22.13.1 AS builder

WORKDIR /back-end

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22.13.1

WORKDIR /back-end

COPY --from=builder /back-end/dist ./dist
COPY --from=builder /back-end/prisma ./prisma
COPY --from=builder /back-end/dist ./dist
COPY --from=builder /back-end/prisma ./prisma

COPY .env .env

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]

EXPOSE 4001