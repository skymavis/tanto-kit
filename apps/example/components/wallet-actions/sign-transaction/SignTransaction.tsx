import { Input } from '@nextui-org/react';
import React, { FC } from 'react';

const SignTransaction: FC = () => {
  return (
    <div>
      <p>Sign Transaction</p>
      <p>Sign transaction to Daily Check in Ronin Wallet</p>
      <Input label={'Your streak'} />
      <Input label={'Transaction Hash'} />
    </div>
  );
};

export default SignTransaction;
