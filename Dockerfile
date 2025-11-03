FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build --quiet

FROM base
COPY --from=build /app/.output ./.output

EXPOSE 3000/tcp

ENV PORT=3000
CMD ["node", ".output/server/index.mjs"]
