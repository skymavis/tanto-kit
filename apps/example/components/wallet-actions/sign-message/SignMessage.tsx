import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { ethers } from 'ethers';
import React, { FC, useState } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';

const SignMessage: FC = () => {
  const { connector, isConnected } = useConnectorStore();

  const [message, setMessage] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const signMessage = async () => {
    setLoading(true);
    try {
      const provider = await connector?.getProvider();
      if (!provider) return;
      const web3Provider = new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
      const signer = web3Provider.getSigner();
      const signature = await signer.signMessage(message);
      setSignature(signature);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card fullWidth>
      <CardHeader className={'flex justify-between gap-20 items-start'}>
        <div className={'flex flex-col'}>
          <h4 className={'font-bold text-xl'}>Sign Message</h4>
          <p>Generate a signature for a message using your wallet.</p>
        </div>
        <Button disabled={!isConnected} onClick={signMessage} isLoading={loading}>
          Sign Message
        </Button>
      </CardHeader>
      <CardBody className={'flex flex-col gap-4'}>
        <Input label={'Your message'} onChange={e => setMessage(e.target.value)} value={message} />
        <Input label={'Your signature'} disabled value={signature} />
      </CardBody>
    </Card>
  );
};

export default SignMessage;
