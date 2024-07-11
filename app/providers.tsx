"use client";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ReactQueryProvider } from "@/config/cache";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: Readonly<ProvidersProps>) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        {...themeProps}
      >
        <ReactQueryProvider>

          {children}
        </ReactQueryProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
