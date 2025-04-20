import { useCallback, useEffect, useState } from 'react';
import { Connector, useConnect } from 'wagmi';

import { DELAY_CONNECT } from '../constants';

interface WalletConnectUriOptions {
  connector: Connector | null;
  expireTime?: number;
}

interface WalletConnectMessage {
  type: string;
  data?: unknown;
}

export function useWalletConnectUri({ connector }: WalletConnectUriOptions) {
  const [uri, setUri] = useState<string | undefined>(undefined);
  const { connect } = useConnect();

  const generateConnectUri = useCallback(() => {
    if (!connector) return;

    setUri(undefined);

    const handleDisplayUri = ({ type, data }: WalletConnectMessage) => {
      if (type !== 'display_uri' || typeof data !== 'string') return;
      setUri(data);
      connector.emitter.off('message', handleDisplayUri);
    };

    connector.emitter.on('message', handleDisplayUri);
    connect({ connector });
  }, [connector, connect]);

  useEffect(() => {
    const timer = setTimeout(generateConnectUri, DELAY_CONNECT);
    return () => clearTimeout(timer);
  }, [generateConnectUri]);

  return { uri };
}
