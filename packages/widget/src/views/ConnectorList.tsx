import { useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';

import { useWidget } from '../contexts/WidgetContext';

// WIP
export function ConnectorList() {
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount();
  const { hide } = useWidget();

  useEffect(() => {
    if (isConnected) hide();
  }, [isConnected]);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        textAlign: 'center',
      }}
    >
      {connectors.map(connector => (
        <div
          css={{
            backgroundColor: 'rgba(205, 213, 229, 0.07)',
            padding: 16,
          }}
          onClick={() => connect({ connector })}
          key={connector.id}
        >
          Connect to {connector.name}
        </div>
      ))}
    </div>
  );
}
