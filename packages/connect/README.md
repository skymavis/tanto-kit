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

#### _Request a connector_

```javascript
import { ChainIds, requestWaypointConnector } from '@sky-mavis/tanto-connect';

// Use your own connector config if needed, if not, we recommend you should leave it as default.
const waypointConnectorConfigs = {};

const waypointConnector = requestWaypointConnector(wayPointConnectorConfigs, ChainIds.RoninMainnet);
```

#### _Request a provider_

```javascript
import { ChainIds, requestWaypointProvider } from '@sky-mavis/tanto-connect';

const waypointProvider = requestWaypointProvider(ChainIds.RoninMainnet);
```
Or if you have already had a `waypointConnector`:

```javascript
const waypointProvider = waypointConnector.requestProvider(ChainIds.RoninMainnet);
```
