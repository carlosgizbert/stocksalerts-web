import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { AuthLayoutWrapper } from '@/components/templates/auth/authLayout';
import { nextAuthOptions } from '../api/auth/[...nextauth]/config';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect('/panel');
  }

  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}
