import '@/client/styles/globals.css';
import type { AppProps } from 'next/app';
import { MeshProvider } from '@meshsdk/react';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/client/styles/theme';
import { Provider } from 'react-redux';
import { store } from '../client/store';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
  // eslint-disable-next-line no-unused-vars
> & { getLayout?: (page: ReactElement) => ReactNode };

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <MeshProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </ThemeProvider>
    </MeshProvider>
  );
}
