import { TantoProvider } from '@sky-mavis/tanto-widget';
import { useTheme } from 'next-themes';

import { customThemeToken } from 'components/theme/customThemeToken';

import { Web3Provider } from '../../components/provider/Web3Provider';
import { ThemeSwitcher } from '../../components/theme/ThemeSwitcher';
import { WalletAccount } from '../../components/wallet-account/WalletAccount';

export default function WidgetExample() {
  const { theme } = useTheme();

  return (
    <Web3Provider>
      <div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
        <ThemeSwitcher />
        <TantoProvider
          appId="dbe1e3ff-e145-422f-84c4-e0beb4972f69"
          theme={theme as 'dark'}
          customThemeToken={theme === 'custom' ? customThemeToken : undefined}
        >
          <WalletAccount />
        </TantoProvider>
      </div>
    </Web3Provider>
  );
}
