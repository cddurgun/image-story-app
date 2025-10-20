import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

// Force Node.js runtime (not Edge) for Prisma compatibility
export const runtime = 'nodejs';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
