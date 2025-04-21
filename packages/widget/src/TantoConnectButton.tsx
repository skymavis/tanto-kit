import { useAccount } from 'wagmi';

import { Button } from './components/button/Button';
import { useWidget } from './hooks/useWidget';
import { Route } from './types/route';

export function TantoConnectButton() {
  const { isConnected } = useAccount();
  const { show, goTo, reset } = useWidget();

  return isConnected ? (
    <Button
      onClick={() => {
        reset();
        goTo(Route.PROFILE, {
          title: (
            <p
              css={{
                textAlign: 'center',
              }}
            >
              Connected
            </p>
          ),
          showBackButton: false,
        });
      }}
    >
      Profile
    </Button>
  ) : (
    <Button
      onClick={() => {
        reset();
        show();
      }}
    >
      Connect
    </Button>
  );
}
