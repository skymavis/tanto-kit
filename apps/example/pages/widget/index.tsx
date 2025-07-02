import { darkTheme, lightTheme, TantoProvider } from '@sky-mavis/tanto-widget';
import { useTheme } from 'next-themes';

import { customThemeToken } from 'components/theme/customThemeToken';

import { Web3Provider } from '../../components/provider/Web3Provider';
import { ThemeSwitcher } from '../../components/theme/ThemeSwitcher';
import { WalletAccount } from '../../components/wallet-account/WalletAccount';

export default function WidgetExample() {
  const { theme } = useTheme();
  const getTheme = () => {
    if (theme === 'custom') return lightTheme(customThemeToken);
    if (theme === 'dark') return darkTheme();
    return lightTheme();
  };

  return (
    <Web3Provider>
      <div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
        <ThemeSwitcher />
        <TantoProvider
          theme={getTheme()}
          config={{
            clientId: '51623f93-6fa6-49d9-972f-c2d07bcab985',
            createAccountOnConnect: true,
            __internal_customBaseUrl: 'https://waypoint-api.skymavis.one/v1/rpc/public',
          }}
        >
          <WalletAccount />
        </TantoProvider>
      </div>
    </Web3Provider>
  );
}
