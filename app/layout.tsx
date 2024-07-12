import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { fontSans } from '@/config/fonts';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'purple darkly - Crie feature flags e lance produtos',
  description: 'Feature flags',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={clsx('font-sans antialiased', fontSans.className)}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
