# Double Growth API container.
#
# Build from the repository root:
#   docker build -f deploy/api.Dockerfile -t double-growth-api .
#
# The API is a Node process with a Prisma client. The database itself is
# external; pass DATABASE_URL and the optional integration variables at
# runtime. No secrets are baked into the image.

FROM node:22-bookworm-slim AS build

WORKDIR /app

# Prisma needs OpenSSL at generate and runtime.
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/validators/package.json packages/validators/package.json
COPY packages/database/package.json packages/database/package.json

RUN npm ci

COPY . .

RUN npm run db:generate \
  && npm run build --workspace @double-growth/api

FROM node:22-bookworm-slim AS runtime

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4000

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/packages/database/prisma ./packages/database/prisma
COPY --from=build /app/package.json ./package.json

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:4000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "apps/api/dist/server.js"]
