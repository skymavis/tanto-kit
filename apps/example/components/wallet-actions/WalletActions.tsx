import React, { FC } from 'react';

import GetBalance from './get-balance/GetBalance';
import RequestAccount from './request-account/RequestAccount';
import SendRon from './send-ron/SendRon';
import SignMessage from './sign-message/SignMessage';
import SignTransaction from './sign-transaction/SignTransaction';

const WalletActions: FC = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <RequestAccount />
      <SignMessage />
      <GetBalance />
      <SendRon />
      <SignTransaction />
    </div>
  );
};

export default WalletActions;
