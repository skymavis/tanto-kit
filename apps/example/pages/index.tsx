import { NextPage } from 'next/types';
import React from 'react';

import Intro from 'components/intro/Intro';

import WalletActions from '../components/wallet-actions/WalletActions';
import WalletConnectors from '../components/wallet-connectors/WalletConnectors';
import { useConnectorStore } from '../hooks/useConnectorStore';

const HomePage: NextPage = () => {
  const connector = useConnectorStore(state => state.connector);

  return (
    <div className={'flex justify-center'}>
      <div className={'max-w-screen-sm flex h-screen flex-col p-6'}>
        <Intro />
        <WalletConnectors />
      </div>

      <div className="flex flex-col max-w-screen-sm p-6  min-h-screen flex-grow">
        <WalletActions key={connector?.id} />
      </div>
    </div>
  );
};

export default HomePage;
