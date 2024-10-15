import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { ethers } from 'ethers';
import React, { FC } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';

const SendRon: FC = () => {
  const { connector, isConnected } = useConnectorStore();
  const [recipient, setRecipient] = React.useState<string>('0xd115A29BDf33f6DB712Dc514721fbFa9b522505c');
  const [amount, setAmount] = React.useState<string>('0');
  const [txHash, setTxHash] = React.useState<string>('');

  const sendNativeToken = async () => {
    const provider = await connector?.getProvider();
    const web3Provider = new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
    const signer = web3Provider.getSigner();

    signer
      .sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount),
      })
      .then(tx => {
        setTxHash(tx.hash);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Card fullWidth>
      <CardHeader className={'flex justify-between'}>
        <div className={'flex flex-col'}>
          <h4 className={'font-bold text-xl'}>Send RON</h4>
        </div>
        <Button disabled={!recipient || !amount || !isConnected} onClick={sendNativeToken}>
          Send
        </Button>
      </CardHeader>
      <CardBody className={'flex flex-col gap-4'}>
        <Input label={'Amount'} value={amount} onValueChange={setAmount} />
        <Input label={'Recipient'} value={recipient} onValueChange={setRecipient} />
        <Input label={'Transaction Hash'} value={txHash} disabled />
      </CardBody>
    </Card>
  );
};

export default SendRon;
