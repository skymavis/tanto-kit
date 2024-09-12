import { Button, Card, CardBody, CardFooter, Input } from '@nextui-org/react';
import { IBaseConnector } from '@sky-mavis/tanto-connect';
import React, { FC } from 'react';

interface IPropsType {
  connector?: IBaseConnector;
}

const GetBalance: FC<IPropsType> = () => {
  return (
    <Card fullWidth>
      <CardBody className={'min-w-[500px]'}>
        <div className={'flex flex-col'}>
          <h4 className={'font-bold text-xl'}>Get Balance</h4>
          <p>Retrieve the balance from your current wallet.</p>
        </div>
        <Input label={'Your balance'} />
      </CardBody>
      <CardFooter className={'flex flex-row-reverse'}>
        <Button>Get Balance</Button>
      </CardFooter>
    </Card>
  );
};

export default GetBalance;
