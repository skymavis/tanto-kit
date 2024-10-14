import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { ChainIds } from '@sky-mavis/tanto-connect';
import { ethers } from 'ethers';
import { isNil } from 'lodash';
import React, { FC, useEffect } from 'react';

import { CheckIn__factory } from '../../../abis/types';
import { useConnectorStore } from '../../../hooks/useConnectorStore';

const CHECK_IN_ADDRESS: Record<number, string> = {
  [ChainIds.RoninMainnet]: '0xcd4f1cd738cf862995239b5b7d9ff09cffc22399',
  [ChainIds.RoninTestnet]: '0x40ca2f9af6050434a62c2f9caba6ebefa59c6982',
};

const SignTransaction: FC = () => {
  const { connector, isConnected, chainId, account } = useConnectorStore();

  const [loadingStreak, setLoadingStreak] = React.useState(false);
  const [isCheckingIn, setIsCheckingIn] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState<number | null>(null);
  const [streak, setStreak] = React.useState<string | null>(null);
  const [txHash, setTxHash] = React.useState<string>('');

  const createCheckInContract = async () => {
    const provider = await connector?.getProvider();
    if (!provider) return;
    const web3Provider = new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
    const signer = web3Provider.getSigner();
    return CheckIn__factory.connect(CHECK_IN_ADDRESS[chainId as ChainIds], signer);
  };

  const fetchStreak = async () => {
    try {
      setLoadingStreak(true);
      const accounts = await connector?.getAccounts();
      if (!accounts || accounts.length < 1) return;
      const checkInContract = await createCheckInContract();
      const currentStreak = await checkInContract?.getCurrentStreak(accounts[0]);
      const isCheckedInToday = await checkInContract?.isCheckedInToday(accounts[0]);
      if (isCheckedInToday) {
        setTimeLeft(timeLeftToCheckIn());
      } else {
        setTimeLeft(null);
      }
      setStreak(String(currentStreak));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStreak(false);
    }
  };

  const checkIn = async () => {
    try {
      setIsCheckingIn(true);
      const accounts = await connector?.getAccounts();
      if (!accounts || accounts.length < 1) return;

      const checkInContract = await createCheckInContract();
      const tx = await checkInContract?.checkIn(accounts[0]);
      setTxHash(tx?.hash || '');
      await fetchStreak();
    } catch (err) {
      console.error(err);
    } finally {
      setIsCheckingIn(false);
    }
  };

  const timeLeftToCheckIn = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(24, 0, 0, 0);
    const diffInMilliseconds = tomorrow.getTime() - now.getTime();
    return Math.floor(diffInMilliseconds / 1000);
  };

  useEffect(() => {
    if (!isNil(timeLeft) && timeLeft > 0) {
      const timeInterval = setInterval(() => {
        setTimeLeft(prev => (prev ? prev - 1 : prev));
      }, 1000);

      return () => clearInterval(timeInterval);
    }
  }, [timeLeft]);

  useEffect(() => {
    fetchStreak();
  }, [account, chainId]);

  return (
    <Card fullWidth>
      <CardHeader className={'flex justify-between'}>
        <div className={'flex flex-col'}>
          <h4 className={'font-bold text-xl'}>Sign Transaction</h4>
          <p>Sign transaction to Daily Check in Ronin Wallet.</p>
        </div>
        <div className={'flex gap-2'}>
          <Button disabled={!isConnected} isLoading={loadingStreak} onClick={fetchStreak}>
            Get Current Streaks
          </Button>
          <Button disabled={!isNil(timeLeft)} isLoading={isCheckingIn} onClick={checkIn}>
            {isNil(timeLeft) ? 'Check In' : `${timeLeft}s`}
          </Button>
        </div>
      </CardHeader>
      <CardBody className={'flex flex-col gap-4'}>
        <Input label={'Your streak'} value={streak || ''} disabled />
        <Input label={'Transaction Hash'} value={txHash} disabled />
      </CardBody>
    </Card>
  );
};

export default SignTransaction;
