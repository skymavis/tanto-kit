import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';

import InjectedProviderConnect from '../ components/InjectedProvidersConnect';
import RoninWalletConnect from '../ components/RoninWalletConnect';

import '../styles/index.scss';

function MyApp() {
  return (
    <NextUIProvider>
      <ThemeProvider defaultTheme="dark">
        <div className={'max-w-2xl flex-col flex mx-auto items-center gap-6 p-10'}>
          <h3>Hello Ronin Wallet!</h3>
          <RoninWalletConnect />
          <InjectedProviderConnect />
        </div>
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default MyApp;
