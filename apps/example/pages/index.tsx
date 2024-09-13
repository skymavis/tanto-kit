import { IBaseConnector } from '@sky-mavis/tanto-connect';
import { NextPage } from 'next';
import React from 'react';

import Intro from 'components/intro/Intro';

import WalletActions from '../components/wallet-actions/WalletActions';
import WalletConnectors from '../components/wallet-connectors/WalletConnectors';

const HomePage: NextPage = () => {
  return (
    <div className={'flex justify-center'}>
      <div className={'max-w-screen-sm flex h-screen flex-col p-6'}>
        <Intro />
        <WalletConnectors />
      </div>

      <div className="flex flex-col max-w-screen-sm p-6  min-h-screen flex-grow">
        <WalletActions />
      </div>
    </div>
  );
};

export default HomePage;
