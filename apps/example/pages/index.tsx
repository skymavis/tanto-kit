import { Button, Card, CardBody, NextUIProvider, Tab, Tabs } from '@nextui-org/react';
import { DEFAULT_CONNECTORS_CONFIG, RoninWalletConnector } from '@sky-mavis/tanto-connect';
import { NextPage } from 'next';
import React from 'react';

import Intro from 'components/intro/Intro';

import InjectedProviderConnect from '../components/InjectedProvidersConnect';
import RoninWalletConnect from '../components/RoninWalletConnect';
import WalletActions from '../components/wallet-actions/WalletActions';
import InjectedWallets from '../components/wallet-connectors/injected-wallets/InjectedWallets';
import RoninWalletConnectors from '../components/wallet-connectors/ronin-wallet/RoninWallet';

const tabs = Object.values(DEFAULT_CONNECTORS_CONFIG).map(connector => ({
  id: connector.id,
  label: connector.name,
  content: connector.name,
  icon: connector.icon,
}));
const HomePage: NextPage = () => {
  return (
    <div className={'flex bg-[#111417]'}>
      <div className={'w-1/2 max-w-[460px] flex h-screen flex-col p-6'}>
        <Intro />
        <Tabs aria-label="Dynamic tabs" items={tabs} isVertical>
          {item => (
            <Tab key={item.id} title={item.label} className={'w-full'}>
              <Card fullWidth>
                <CardBody>
                  {/*<RoninWalletConnectors roninConnector={new RoninWalletConnector()} />*/}
                  <InjectedWallets />
                </CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen flex-grow">
        <div className="mt-8 flex flex-col items-center gap-4">
          {/*<InjectedProviderConnect />*/}
          {/*<RoninWalletConnect />*/}
          <WalletActions connector={new RoninWalletConnector()} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
