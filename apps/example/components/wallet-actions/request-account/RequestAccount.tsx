import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { isNil } from 'lodash';
import React, { FC, useState } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';

const RequestAccount: FC = () => {
  const connector = useConnectorStore(state => state.connector);

  const [loading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);

  const requestAccount = () => {
    setLoading(true);
    connector
      ?.requestAccounts()
      .then(accounts => setAccount(accounts[0]))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <Card fullWidth>
      <CardHeader className={'flex justify-between items-start gap-20'}>
        <div className={'flex flex-col'}>
          <h4 className={'font-bold text-xl '}>Request Account</h4>
          <p> Initiate a request to create or access an account within the wallet system.</p>
        </div>
        <Button isLoading={loading} onClick={requestAccount} disabled={isNil(connector)} className={'px-6'}>
          Request Account
        </Button>
      </CardHeader>
      <CardBody>
        <Input label={'Your address'} value={account || ''} disabled />
      </CardBody>
      <CardFooter className={'flex flex-row-reverse'}></CardFooter>
    </Card>
  );
};

export default RequestAccount;
