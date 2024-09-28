# Tanto connect

## Installation

With yarn

```
yarn add @sky-mavis/tanto-connect
```

With npm

```
npm install @sky-mavis/tanto-connect
```

## Usage

### Tanto Connectors

#### EIP-6963 Injected Connectors

```javascript
import { ConnectorEvent, IBaseConnector, IConnectResult, requestInjectedConnectors, requestRoninWalletConnector } from '@sky-mavis/tanto-connect';

const injectedConnectors = requestInjectedConnectors();
// Find Ronin Wallet connector
const roninWaletConnector = injectedConnectors.find(connector => connector.isRonin);

// Request Ronin Wallet Connector only
const roninConnector = await requestRoninWalletConnector();
roninConnector.on(ConnectorEvent.CONNECT, onConnect);
roninConnector.on(ConnectorEvent.ACCOUNTS_CHANGED, onAccountChanged);
roninConnector.on(ConnectorEvent.CHAIN_CHANGED, onChainChanged);
roninConnector.on(ConnectorEvent.DISCONNECT, () => setIsConnected(false));
roninConnector.autoConnect();
```

#### Ronin Wallet Connect connector
    
```javascript
const wcOptions = {
  projectId: 'd2ef97836db7eb390bcb2c1e9847ecdc',
  metadata: {
    name: 'New Ronin Wallet',
    description: 'New Ronin Wallet',
    icons: ['https://cdn.skymavis.com/skymavis-home/public//homepage/core-value.png'],
    url: 'https://wallet.roninchain.com',
  },
};

const roninWalletConnectConnector = requestRoninWalletConnectConnector(wcOptions);
roninWalletConnectConnector.on(ConnectorEvent.CONNECT, onConnect);
roninWalletConnectConnector.on(ConnectorEvent.ACCOUNTS_CHANGED, onAccountChanged);
roninWalletConnectConnector.on(ConnectorEvent.CHAIN_CHANGED, onChainChanged);
roninWalletConnectConnector.on(ConnectorEvent.DISPLAY_URI, uri => setUri(uri));
roninWalletConnectConnector.on(ConnectorEvent.DISCONNECT, async () => {
  setUri(null);
  setIsConnected(false);
  roninWalletConnectConnector.connect(2021);
});
roninWalletConnectConnector.connect(2021);
```


#### Waypoint Connector

```javascript
import { requestWaypointConnector, ChainIds } from '@sky-mavis/tanto-connect';

const waypointProviderConfigs = {
  clientId: "",
  chainId: ChainIds.RoninMainnet,
};
// Use your own connector config if needed, if not, we recommend you should leave it as default.
const waypointConnectorConfigs = {};

const waypointConnector = requestWaypointConnector(
  waypointConnectorConfigs,
  waypointProviderConfigs
);
```
