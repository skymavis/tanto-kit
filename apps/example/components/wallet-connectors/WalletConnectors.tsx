import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { DEFAULT_CONNECTORS_CONFIG } from '@sky-mavis/tanto-connect';
import { SupportedConnectors } from '@sky-mavis/tanto-connect/src';
import React, { FC } from 'react';

import WillRender from '../will-render/WillRender';
import InjectedWallets from './injected-wallets/InjectedWallets';
import RoninWallet from './ronin-wallet/RoninWallet';

const tabs = Object.values(DEFAULT_CONNECTORS_CONFIG).map(connector => ({
  id: connector.id as SupportedConnectors,
  name: connector.name,
  icon: connector.icon,
  type: connector.type,
}));

const WalletConnectors: FC = () => {
  return (
    <Tabs aria-label="Dynamic tabs" items={tabs} isVertical>
      {item => (
        <Tab key={item.id} title={item.name} className={'w-full'}>
          <Card fullWidth>
            <CardBody>
              <WillRender when={item.id === SupportedConnectors.INJECTED}>
                <InjectedWallets />
              </WillRender>
              <WillRender when={item.id === SupportedConnectors.RONIN_WALLET}>
                <RoninWallet />
              </WillRender>
            </CardBody>
          </Card>
        </Tab>
      )}
    </Tabs>
  );
};

export default WalletConnectors;
