import { useCallback } from 'react';
import { Connector, useConnect, UseConnectReturnType } from 'wagmi';

import { CONNECT_STATES } from '../types';
import { isMobile, isWCConnector } from '../utils';

const normalizeConnectStatus = (status: UseConnectReturnType['status'], connector?: Connector) => {
  switch (status) {
    case 'idle':
    case 'pending':
      if (isWCConnector(connector?.id) && isMobile()) return CONNECT_STATES.OPENING_WALLET;
      return CONNECT_STATES.PENDING;
    case 'success':
      return CONNECT_STATES.SUCCESS;
    case 'error':
      return CONNECT_STATES.ERROR;
  }
};

export function useTriggerConnect({ connector }: { connector?: Connector }) {
  const { status, connect: wagmiConnect } = useConnect();

  const connect = useCallback(() => {
    if (connector) wagmiConnect({ connector });
  }, [connector, wagmiConnect]);

  return { status: normalizeConnectStatus(status, connector), connect };
}
