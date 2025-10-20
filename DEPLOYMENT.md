# Deployment Guide

## Issue Resolved: Database Connection Error in Vercel

### Root Cause
The authentication login API was failing in Vercel due to missing database configuration for serverless environments. Neon PostgreSQL requires two connection URLs when used with Prisma:

1. **DATABASE_URL** (Pooled): For connection pooling in serverless functions
2. **DIRECT_URL** (Direct): For migrations and schema operations

### What Was Fixed

#### 1. Updated Prisma Schema
File: `prisma/schema.prisma`

Added `directUrl` configuration to properly handle both pooled and direct connections:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

#### 2. Enhanced Prisma Client Initialization
File: `lib/prisma.ts`

Added logging configuration for better debugging:
```typescript
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})
```

#### 3. Updated Environment Variables

**Local Development:**
- Updated `.env` and `.env.local` with both DATABASE_URL and DIRECT_URL

**Production (Vercel):**
- Added DIRECT_URL environment variable using: `vercel env add DIRECT_URL production`

### Environment Variable Configuration

For Neon PostgreSQL, you need:

```env
# Pooled connection (with -pooler in hostname)
DATABASE_URL=postgresql://USER:PASSWORD@HOST-pooler.REGION.aws.neon.tech/DB?sslmode=require

# Direct connection (without -pooler in hostname)
DIRECT_URL=postgresql://USER:PASSWORD@HOST.REGION.aws.neon.tech/DB?sslmode=require
```

**Key Difference:** The DIRECT_URL removes `-pooler` from the hostname.

## Deployment Steps

### First-Time Setup

1. Ensure all environment variables are set in Vercel:
   ```bash
   vercel env ls
   ```

   You should see:
   - DATABASE_URL
   - DIRECT_URL
   - NEXTAUTH_SECRET
   - TOGETHER_API_KEY

2. If any are missing, add them:
   ```bash
   vercel env add VARIABLE_NAME production
   ```

### Deploying to Vercel

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Fix: Add DIRECT_URL for Prisma serverless connection"
   git push
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

   Or let automatic deployment trigger from your git push.

3. **Verify deployment:**
   - Check that the build succeeds
   - Test the login endpoint at: `https://your-app.vercel.app/api/auth/login`

## Build Process

The `package.json` build script automatically:
1. Pushes database schema: `prisma db push --accept-data-loss`
2. Generates Prisma Client: `prisma generate`
3. Builds Next.js app: `next build --turbopack`

## Troubleshooting

### If login still fails:

1. **Check Vercel logs:**
   ```bash
   vercel logs
   ```

2. **Verify environment variables are set:**
   ```bash
   vercel env ls
   ```

3. **Test database connection locally:**
   ```bash
   npx prisma db push
   npx prisma studio
   ```

4. **Check Neon database status:**
   - Log in to Neon dashboard
   - Verify the database is active
   - Check connection limits

### Common Issues:

- **"Can't reach database server"**: Check if DIRECT_URL is set correctly without `-pooler`
- **"Too many connections"**: Use DATABASE_URL with `-pooler` for application queries
- **"Migration failed"**: Ensure DIRECT_URL is set in Vercel environment variables

## Next Steps

After successful deployment:
1. Test user login functionality
2. Monitor Vercel logs for any database errors
3. Consider adding connection pooling limits if needed
4. Set up database backups in Neon dashboard

## Additional Resources

- [Neon Serverless Driver Docs](https://neon.tech/docs/serverless/serverless-driver)
- [Prisma with Neon Guide](https://www.prisma.io/docs/guides/database/neon)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
