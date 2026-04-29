FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@10.33 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Compose runs the container as UID 1000 — make /app writable for that user
RUN chown -R 1000:1000 /app

EXPOSE 3000

CMD ["sh", "-c", "pnpm db:migrate && pnpm dev --hostname 0.0.0.0 --port 3000"]
