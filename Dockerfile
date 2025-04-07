FROM node:22.13.1 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

COPY prisma ./prisma
RUN npx prisma generate

RUN npm run build

#/\ Builder 

FROM node:22.13.1

WORKDIR /app


COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

COPY .env .env

CMD ["sh", "-c", "wait-port db:5432 && npx prisma migrate deploy && node dist/server.js"]

EXPOSE 4001