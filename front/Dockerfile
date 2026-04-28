FROM node:24-alpine

# Build deps for better-sqlite3 native module
RUN apk add --no-cache python3 make g++

RUN corepack enable && corepack prepare pnpm@10.33 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Allow non-root runtime user (matches compose `user:` directive) to write to /app
RUN chown -R 1000:1000 /app

EXPOSE 3000

CMD ["sh", "-c", "mkdir -p \"$(dirname \"$BETTER_AUTH_DB_PATH\")\" && pnpm exec better-auth migrate --yes --config ./src/lib/auth/auth.ts && pnpm dev --hostname 0.0.0.0 --port 3000"]
