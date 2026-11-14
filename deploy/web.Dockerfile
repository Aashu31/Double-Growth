# Double Growth website container.
#
# Build from the repository root and pass the public build-time URLs:
#   docker build -f deploy/web.Dockerfile \
#     --build-arg NEXT_PUBLIC_SITE_URL=https://doublegrowth.in \
#     --build-arg NEXT_PUBLIC_API_URL=https://api.doublegrowth.in \
#     -t double-growth-web .
#
# NEXT_PUBLIC_* values are embedded in the client bundle, so changing them
# requires a rebuild. Never pass secrets as build arguments.

FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/validators/package.json packages/validators/package.json

RUN npm ci

COPY . .

ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_API_URL=http://localhost:4000
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build --workspace @double-growth/web

FROM node:22-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build /app ./

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npm", "run", "start", "--workspace", "@double-growth/web"]
