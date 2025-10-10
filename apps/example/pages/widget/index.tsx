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
            clientId: 'c470d211-493b-4f9b-978f-e5d00ace0232',
            createAccountOnConnect: true,
            __internal_waypointBaseUrl: 'https://waypoint-api.skymavis.one/v1/rpc/public',
            __internal_mpcBaseUrl: 'https://growing-narwhal-infinitely.ngrok-free.app/v1/public/rpc',
            __internal_mpcSocketUrl: 'wss://project-x.skymavis.one',
            showConfirmationModal: true,
          }}
        >
          <WalletAccount />
        </TantoProvider>
      </div>
    </Web3Provider>
  );
}
