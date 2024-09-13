import React, { FC } from 'react';

import GetBalance from './get-balance/GetBalance';
import RequestAccount from './request-account/RequestAccount';
import SignMessage from './sign-message/SignMessage';

const WalletActions: FC = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <RequestAccount />
      <GetBalance />
      <SignMessage />
      {/*<SignTransaction />*/}
    </div>
  );
};

export default WalletActions;
