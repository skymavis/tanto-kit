import { useCallback, useEffect, useState } from 'react';
import { Connector } from 'wagmi';

import { DELAY_CONNECT } from '../constants';
import { isWCConnector } from '../utils';
import { useConnect } from './useConnect';

interface WalletConnectUriParameters {
  connector?: Connector;
  onReceiveDisplayUri?: (url: string) => void;
}

interface WalletConnectMessage {
  type: string;
  data?: unknown;
}

export function useWalletConnectUri({ connector, onReceiveDisplayUri }: WalletConnectUriParameters) {
  const [uri, setUri] = useState<string | undefined>(undefined);
  const { status, connect, error } = useConnect({ connector });

  const generateConnectUri = useCallback(() => {
    if (!connector || !isWCConnector(connector.id)) return;

    setUri(undefined);

    const handleDisplayUri = ({ type, data }: WalletConnectMessage) => {
      if (type !== 'display_uri' || typeof data !== 'string') return;
      setUri(data);
      onReceiveDisplayUri?.(data);
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
    error,
  };
}
