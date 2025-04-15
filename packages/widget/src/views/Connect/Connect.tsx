import { useEffect } from 'react';
import { useConnect } from 'wagmi';

import { useTanto } from '../../hooks/useTanto';

// Avoid layout shift
const DELAY_CONNECT = 600;

export function Connect() {
  const { connect } = useConnect();
  const { connector } = useTanto();

  useEffect(() => {
    if (connector) {
      const timer = setTimeout(() => connect({ connector }), DELAY_CONNECT);
      return () => clearTimeout(timer);
    }
  }, [connect, connector]);

  return (
    <div>
      <img src={connector?.icon} alt={connector?.name} width={'100%'} height={'100%'} />
    </div>
  );
}
