import type { PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';

import { useWallets } from '../../hooks/useWallets';
import type { Wallet } from '../../types/wallet';
import type { WidgetConnectState } from './WidgetConnectContext';
import { WidgetConnectContext } from './WidgetConnectContext';

export function WidgetConnectProvider({ children }: PropsWithChildren) {
  const { wallets, primaryWallets, secondaryWallets } = useWallets();
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();
  const selectedConnector = useMemo(() => selectedWallet?.connector, [selectedWallet?.connector]);
  const contextValue = useMemo<WidgetConnectState>(
    () => ({
      wallets,
      primaryWallets,
      secondaryWallets,
      selectedConnector,
      selectedWallet,
      setSelectedWallet,
    }),
    [primaryWallets, secondaryWallets, selectedConnector, selectedWallet],
  );

  return <WidgetConnectContext.Provider value={contextValue}>{children}</WidgetConnectContext.Provider>;
}
