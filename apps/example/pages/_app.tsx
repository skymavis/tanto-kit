import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import '../styles/index.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <ThemeProvider defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default MyApp;
