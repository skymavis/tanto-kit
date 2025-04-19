import { useCallback, useEffect, useState } from 'react';
import { Connector, useConnect } from 'wagmi';

interface WalletConnectUriOptions {
  connector: Connector | null;
  expireTime?: number;
}

interface WalletConnectMessage {
  type: string;
  data?: unknown;
}

const DEFAULT_URI_EXPIRE_TIME = 5 * 60;
const CHECK_INTERVAL = 1000;

export function useWalletConnectUri({ connector, expireTime = DEFAULT_URI_EXPIRE_TIME }: WalletConnectUriOptions) {
  const [uri, setUri] = useState<string | undefined>(undefined);
  const [remainingTime, setRemainingTime] = useState(0);
  const { connect } = useConnect();

  const generateConnectUri = useCallback(() => {
    if (!connector) return;

    setUri(undefined);

    const handleDisplayUri = ({ type, data }: WalletConnectMessage) => {
      if (type !== 'display_uri' || typeof data !== 'string') return;
      setUri(data);
      setRemainingTime(expireTime);
      connector.emitter.off('message', handleDisplayUri);
    };

    connector.emitter.on('message', handleDisplayUri);
    connect({ connector });
  }, [connector, connect, expireTime]);

  useEffect(() => {
    generateConnectUri();
  }, [generateConnectUri]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 0) {
          generateConnectUri();
          return expireTime;
        }
        return uri ? prev - 1 : prev;
      });
    }, CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [generateConnectUri, uri, expireTime]);

  return { uri, remainingTime };
}
