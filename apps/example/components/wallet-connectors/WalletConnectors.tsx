import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { DEFAULT_CONNECTORS_CONFIG, SupportedConnectors } from '@sky-mavis/tanto-connect';
import React, { FC } from 'react';

import InjectedWallets from './injected-wallets/InjectedWallets';
import RoninWallet from './ronin-wallet/RoninWallet';
import RoninMobile from './ronin-wallet-connect/RoninWalletConnect';
import Waypoint from './waypoint/Waypoint';

const tabs = Object.values(DEFAULT_CONNECTORS_CONFIG).map(connector => ({
  id: connector.id as SupportedConnectors,
  name: connector.name,
  icon: connector.icon,
  type: connector.type,
}));

const mappingConnectorUI = {
  [SupportedConnectors.INJECTED]: <InjectedWallets />,
  [SupportedConnectors.RONIN_WALLET]: <RoninWallet />,
  [SupportedConnectors.RONIN_WC]: <RoninMobile />,
  [SupportedConnectors.WAYPOINT]: <Waypoint />,
  [SupportedConnectors.SAFE]: <></>,
};

const WalletConnectors: FC = () => {
  return (
    <Tabs aria-label="Dynamic tabs" items={tabs} isVertical>
      {item => (
        <Tab key={item.id} title={item.name} className={'w-full'}>
          <Card fullWidth>
            <CardBody>{mappingConnectorUI[item.id]}</CardBody>
          </Card>
        </Tab>
      )}
    </Tabs>
  );
};

export default WalletConnectors;
