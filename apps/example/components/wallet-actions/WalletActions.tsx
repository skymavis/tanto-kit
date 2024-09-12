import { IBaseConnector } from '@sky-mavis/tanto-connect';
import React, { FC } from 'react';

import GetBalance from './get-balance/GetBalance';
import RequestAccount from './request-account/RequestAccount';
import SignMessage from './sign-message/SignMessage';

interface IPropsType {
  connector?: IBaseConnector;
}

const WalletActions: FC<IPropsType> = ({ connector }) => {
  return (
    <div className={'flex flex-col gap-4'}>
      <RequestAccount connector={connector} />
      <GetBalance connector={connector} />
      <SignMessage connector={connector} />
      {/*<SignTransaction />*/}
    </div>
  );
};

export default WalletActions;
