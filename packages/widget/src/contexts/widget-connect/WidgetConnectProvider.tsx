import { PropsWithChildren, useMemo, useState } from 'react';

import { useWallets } from '../../hooks/useWallets';
import { Wallet } from '../../types/wallet';
import { WidgetConnectContext, WidgetConnectState } from './WidgetConnectContext';

export const WidgetConnectProvider = ({ children }: PropsWithChildren) => {
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
};
