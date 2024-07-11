import NextAuth from 'next-auth';
import { nextAuthOptions } from './config';

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
