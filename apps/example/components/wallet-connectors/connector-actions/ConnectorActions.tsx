import { Button, Select, SelectItem, User } from '@nextui-org/react';
import { BaseConnector } from '@sky-mavis/tanto-connect';
import { CHAINS_CONFIG } from '@sky-mavis/tanto-connect/src';
import { isNil } from 'lodash';
import React, { FC } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';
import WillRender from '../../will-render/WillRender';

const ConnectorActions: FC = () => {
  const connector = useConnectorStore(state => state.connector) as BaseConnector;
  const { account, chainId } = useConnectorStore();
  const [networkSwitch, setNetworkSwitch] = React.useState<number | null>();

  const disconnectWallet = () => {
    connector.disconnect();
  };

  const handleClickSwitchNetwork = () => {
    if (networkSwitch) {
      connector.switchChain(networkSwitch).catch(console.error);
    } else {
      setNetworkSwitch(chainId);
    }
  };

  return (
    <div>
      <User name={connector.name} description={account} />
      <div>
        <div className={'flex gap-2 justify-center'}>
          <Button fullWidth radius={'sm'} disabled>
            {chainId ? `Chain ID: ${chainId}` : 'Get ChainID'}
          </Button>
          <Button onClick={disconnectWallet} fullWidth color={'secondary'} radius={'sm'}>
            Disconnect
          </Button>
        </div>
        <div className={'flex gap-2 justify-center mt-2'}>
          <WillRender when={!isNil(networkSwitch)}>
            <Select
              radius={'sm'}
              placeholder={'Select Network'}
              onChange={e => setNetworkSwitch(Number(e.target.value))}
            >
              {Object.values(CHAINS_CONFIG).map(chain => (
                <SelectItem key={chain.chainId} value={chain.chainId}>
                  {chain.chainName + ' - ' + chain.chainId}
                </SelectItem>
              ))}
            </Select>
          </WillRender>
          <Button onClick={handleClickSwitchNetwork} radius={'sm'} className={'px-10'} fullWidth={isNil(networkSwitch)}>
            Switch Network
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectorActions;
