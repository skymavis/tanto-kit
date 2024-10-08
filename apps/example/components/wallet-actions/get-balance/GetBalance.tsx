import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { ethers } from 'ethers';
import React, { FC, useState } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';

const GetBalance: FC = () => {
  const { connector, isConnected } = useConnectorStore();
  const [balance, setBalance] = React.useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getBalance = async () => {
    setLoading(true);
    try {
      const provider = await connector?.getProvider();
      if (!provider) return;

      const web3Provider = new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      const balance = await web3Provider.getBalance(address);
      const balanceInEther = ethers.utils.formatEther(balance);

      setBalance(balanceInEther);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card fullWidth>
      <CardHeader className={'flex justify-between gap-20'}>
        <div className={'flex flex-col'}>
          <h4 className={'font-bold text-xl'}>Get Balance</h4>
          <p>Retrieve the balance from your current wallet.</p>
        </div>
        <Button onClick={getBalance} isLoading={loading} disabled={!isConnected}>
          Get Balance
        </Button>
      </CardHeader>
      <CardBody>
        <Input label={'Your balance'} value={balance} readOnly />
      </CardBody>
    </Card>
  );
};

export default GetBalance;
