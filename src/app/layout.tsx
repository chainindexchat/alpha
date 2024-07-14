import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "ChainIndexChat",
  description: "Query blockchain data with natural languge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />

      </head>
      <body className={inter.className}>
      <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
      <CssBaseline />

        {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
        </body>
    </html>
  );
}
