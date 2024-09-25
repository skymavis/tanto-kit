# Tanto kit connect

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

### Connector Configs

We use the same types for connector configs, which you can use to override the default configs of any connectors.

```javascript
const connectorConfigs = {
  id: "",
  name: "",
  type: "",
  icon: "",
};
```

### Waypoint Connector

The configs that override the default configs of the Waypoint provider.

```javascript
import { ChainIds } from '@sky-mavis/tanto-connect';

const waypointProviderConfigs = {
  clientId: "",
  chainId: ChainIds.RoninMainnet,
};
```

#### _Request a connector_

```javascript
import { requestWaypointConnector } from '@sky-mavis/tanto-connect';

// Use your own connector config if needed, if not, we recommend you should leave it as default.
const waypointConnectorConfigs = {};

const waypointConnector = requestWaypointConnector(
  waypointConnectorConfigs,
  waypointProviderConfigs
);
```

#### _Request a provider_

```javascript
import { requestWaypointProvider } from '@sky-mavis/tanto-connect';

const waypointProvider = requestWaypointProvider(waypointProviderConfigs);
```

Or if you have already had a `waypointConnector`:

```javascript
const waypointProvider = waypointConnector.requestProvider(
  waypointProviderConfigs
);
```
