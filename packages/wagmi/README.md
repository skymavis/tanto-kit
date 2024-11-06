# TantoKit Wagmi

## Installation

With yarn

```
yarn add @sky-mavis/tanto-wagmi
```

With npm

```
npm install @sky-mavis/tanto-wagmi
```

## Usage

### Create Config
Create and export a new Wagmi config using createConfig where chains and transports are set up for the Ronin and Saigon network.

To connect to Ronin Wallet and Ronin Waypoint, use the **roninWallet()** and **waypoint()** connectors. For waypoint, you need to pass specific configuration parameters as required by the Waypoint SDK (Check the [Ronin Waypoint Web SDK](https://docs.skymavis.com/mavis/ronin-waypoint/reference/web-sdk) for details.).


```javascript
import { roninWallet, waypoint } from '@sky-mavis/tanto-wagmi';
import { ronin, saigon } from 'viem/chains';
import { createConfig, http } from 'wagmi';

export const config = createConfig({
    chains: [ronin, saigon],
    transports: {
        [ronin.id]: http(),
        [saigon.id]: http(),
    },
    multiInjectedProviderDiscovery: false,
    connectors: [roninWallet(), waypoint(waypointConfigs)],
})
```

### Using Wagmi Providers

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

const App = () => (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <YourComponent />
        </QueryClientProvider>
    </WagmiProvider>
);
```

### Using Wagmi Hooks
```javascript
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { Button } from '@nextui-org/react';

const YourComponent = () => {
    const { connect, connectors } = useConnect();

    return (
        <div>
            {connectors.map((connector) => (
                <Button onClick={() => connect({ connector })} key={connector.id}>
                    Connect to {connector.name}
                </Button>
            ))}
        </div>
    );
};
```

