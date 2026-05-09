FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /repo

FROM base AS pruner
RUN npm i -g turbo@2.3.3
COPY . .
RUN turbo prune @raadmounif/web --docker

FROM base AS builder
COPY --from=pruner /repo/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruner /repo/out/full/ .
RUN pnpm turbo run build --filter=@raadmounif/web

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /repo/out/json/ .
RUN pnpm install --prod --frozen-lockfile
COPY --from=builder /repo/apps/web/.next ./apps/web/.next
COPY --from=builder /repo/apps/web/public ./apps/web/public
COPY --from=builder /repo/apps/web/package.json ./apps/web/package.json
COPY --from=builder /repo/apps/web/next.config.ts ./apps/web/next.config.ts
USER node
EXPOSE 3000
WORKDIR /app/apps/web
CMD ["pnpm", "start"]
