import { useCallback, useEffect, useState } from 'react';
import { Connector } from 'wagmi';

import { DELAY_CONNECT } from '../constants';
import { useTriggerConnect } from './useTriggerConnect';

interface WalletConnectUriOptions {
  connector: Connector | null;
}

interface WalletConnectMessage {
  type: string;
  data?: unknown;
}

export function useWalletConnectUri({ connector }: WalletConnectUriOptions) {
  const [uri, setUri] = useState<string | undefined>(undefined);
  const { connect, status } = useTriggerConnect({ connector });

  const generateConnectUri = useCallback(() => {
    if (!connector) return;

    setUri(undefined);

    const handleDisplayUri = ({ type, data }: WalletConnectMessage) => {
      if (type !== 'display_uri' || typeof data !== 'string') return;
      setUri(data);
      connector.emitter.off('message', handleDisplayUri);
    };

    connector.emitter.on('message', handleDisplayUri);
    connect();
  }, [connector, connect]);

  useEffect(() => {
    const timer = setTimeout(generateConnectUri, DELAY_CONNECT);
    return () => clearTimeout(timer);
  }, [generateConnectUri]);

  return {
    uri,
    status,
    generateConnectUri,
  };
}
