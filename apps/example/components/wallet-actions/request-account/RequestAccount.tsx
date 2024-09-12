import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { IBaseConnector } from '@sky-mavis/tanto-connect';
import React, { FC, useState } from 'react';

interface IPropsType {
  connector?: IBaseConnector;
}

const RequestAccount: FC<IPropsType> = ({ connector }) => {
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
      <CardHeader>
        <div className={'flex flex-col'}>
          <h4 className={'font-bold text-xl'}>Request Account</h4>
          <p> Initiate a request to create or access an account within the wallet system.</p>
        </div>
      </CardHeader>
      <CardBody>
        <Input label={'Your address'} value={account || ''} disabled />
      </CardBody>
      <CardFooter className={'flex flex-row-reverse'}>
        <Button isLoading={loading} onClick={requestAccount}>
          Request Account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RequestAccount;
