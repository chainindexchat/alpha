# Adapted from
# https://turbo.build/repo/docs/guides/tools/docker
###################
# STAGE 0: base
###################
FROM node:18-alpine AS base
WORKDIR /app

# install bash for devcontainers
RUN apk update 
RUN apk add --no-cache libc6-compat bash sudo shadow git curl
# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN yarn global add turbo@^2
RUN npm install -g turbo@2.0.6
RUN npm install -g pnpm

# # Don't run as root
# RUN addgroup --system --gid 1001 nodejs
# # TODO: capture this password in ENV 
# # TODO remove user nextjs from sudoers
# # TODO split user config between development and production
# RUN id -u nextjs &>/dev/null || adduser --system --uid 1001 --ingroup nodejs --shell /bin/bash nextjs && echo "nextjs:yourpassword" | chpasswd && echo "nextjs ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/nextjs
# RUN chown nextjs:nodejs /app
# USER nextjs

###################
# STAGE 1: pruner
###################
FROM base AS pruner
# Set working directory
WORKDIR /app
COPY . .
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune chainindex_chat --docker
 

###################
# STAGE 2: installer
###################
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app
 # First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/full/ .
RUN pnpm install --filter=chainindex_chat

###################
# STAGE 3: builder
###################
FROM installer AS builder
WORKDIR /app
RUN mkdir -p /app/.turbo/cache
RUN turbo build --filter=chainindex_chat


###################
# STAGE 3: prodcution runner
###################
FROM base AS production
WORKDIR /app

COPY --from=builder /app/apps/chainindex_chat/next.config.mjs .
COPY --from=builder /app/apps/chainindex_chat/package.json .
 # Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/chainindex_chat/.next/static ./apps/chainindex_chat/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/chainindex_chat/public ./apps/chainindex_chat/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/chainindex_chat/.next/standalone ./

CMD node apps/chainindex_chat/server.js

###################
# STAGE 4: development runner
###################
# Development stage with Turbo Dev Server
FROM base AS development
WORKDIR /app
RUN mkdir -p /app/.turbo/cache
# Expose port for Turbo Dev Server (adjust as per your application)
EXPOSE 3000
RUN pnpm install --filter=chainindex_chat

# USER nextjs

# Start Turbo Dev Server with hot reloading
CMD ["turbo", "dev", "--filter", "chainindex_chat"]

