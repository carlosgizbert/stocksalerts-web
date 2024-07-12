'use client';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { ReactQueryProvider } from '@/config/cache';
import { SessionProvider } from 'next-auth/react';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: Readonly<ProvidersProps>) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
      <NextThemesProvider
        defaultTheme="dark"
        attribute="class"
        {...themeProps}
      >
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </NextThemesProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
