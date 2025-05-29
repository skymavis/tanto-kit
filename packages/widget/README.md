# Tanto Widget

**Tanto Widget** is a React component library designed to provide a seamless **Connect Wallet** experience for Web3 applications, with a focus on **Ronin Wallets** and Ethereum-compatible wallets.

## Features

- **Unified Ronin Wallet Integration**: Connect to Ronin Wallets effortlessly, handling edge cases for desktop, mobile, and in-wallet browsers.
- **Supported Wallets**:
  - Ronin Waypoint
  - Ronin Wallet
  - WalletConnect
  - Injected Wallets (EIP-6963 compliant)
- **Responsive Design**: Optimized for all screen sizes and devices.
- **Customizable Themes**: Tailor the widget’s appearance to match your application’s branding.
- **Powered by Wagmi**: Leverages Wagmi’s React hooks for wallet state management, signing, transactions, and blockchain interactions.

## Demo

- **Live Demo**: [Tanto Widget Playground](https://tanto-widget-playground.vercel.app/)
- **Source Code**: [GitHub Repository](https://github.com/nguyenhuugiatri/tanto-kit)

## Installation

### Prerequisites

Install the required peer dependencies:

```bash
yarn add wagmi viem@2.x @tanstack/react-query
```

### Install Tanto Widget

```bash
yarn add @sky-mavis/tanto-widget
```

## Setup

Wrap your application with the necessary providers (`WagmiProvider`, `QueryClientProvider`, and `TantoProvider`) to enable Tanto Widget functionality.

```tsx
import { getDefaultConfig, TantoProvider } from '@sky-mavis/tanto-widget';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const config = getDefaultConfig();
const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TantoProvider>{/* Your App Components */}</TantoProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
```

## Usage

### TantoConnectButton

Add wallet connection functionality with the `TantoConnectButton` component.

```tsx
import { TantoConnectButton } from '@sky-mavis/tanto-widget';

function Page() {
  return <TantoConnectButton />;
}
```

**Behavior**:

- **Disconnected**: Displays a "Connect Wallet" button that opens a modal for wallet selection.
- **Connected**: Shows the wallet’s avatar and address. Clicking it opens a **Profile Modal** with wallet details and a disconnect option.

### Blockchain Interactions

Use **Wagmi** hooks to interact with the blockchain, such as reading wallet state, signing messages, or sending transactions.

#### Example: Signing a Message

```tsx
import { useSignMessage } from 'wagmi';

function SignMessageButton() {
  const { signMessage } = useSignMessage();

  const handleSign = () => {
    signMessage({ message: 'Hello, Web3!' });
  };

  return <button onClick={handleSign}>Sign Message</button>;
}
```

For more hooks (e.g., `useAccount`, `useSendTransaction`), see the [Wagmi Documentation](https://wagmi.sh/).

## Customization

### Theme

Tanto supports three themes out of the box:

- `dark` – Dark mode
- `light` – Light mode

> **Default Theme**: `dark`

To set the theme, wrap your application with the `TantoProvider` and pass the desired theme as a prop:

```tsx
import { TantoProvider } from '@tanto/widget';

<TantoProvider theme="light">{/* Your App */}</TantoProvider>;
```

### Custom Themes

Customize the widget’s appearance by passing a `customThemeToken` to `TantoProvider`.

```tsx
import { TantoProvider } from '@sky-mavis/tanto-widget';
import type { TantoWidgetCustomTheme } from '@sky-mavis/tanto-widget';

const customTheme: TantoWidgetCustomTheme = {
  mode: 'light',
  fontFamily: ["'Nunito'", 'sans-serif'],
  fontSize: '1em',
  buttonPrimaryBackground: 'oklch(0.71 0.097 111.7)',
  buttonPrimaryColor: 'oklch(0.98 0.005 0)',
  modalBackground: 'oklch(0.92 0.042 83.6)',
  modalBorderRadius: '0.625rem',
  // Add more theme tokens as needed
};

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TantoProvider customThemeToken={customTheme}>
          {/* Your App */}
        </TantoProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

See `TantoWidgetCustomTheme` for a full list of theme tokens.

### Custom Wallet Configuration

Customize wallet connection options via `getDefaultConfig`.

```tsx
import { getDefaultConfig } from '@sky-mavis/tanto-widget';

const config = getDefaultConfig({
  appName: 'My DApp',
  appIcon: 'https://my-dapp.com/icon.png',
  appDescription: 'A decentralized application for Web3 enthusiasts',
  appUrl: 'https://my-dapp.com',
  walletConnectProjectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  keylessWalletConfig: {
    chainId: 2020, // Ronin Mainnet
    clientId: 'YOUR_CLIENT_ID',
    waypointOrigin: 'https://waypoint.roninchain.com',
    popupCloseDelay: 1000,
  },
});
```

**Parameters**:

- `appName` (optional): Name of your DApp (e.g., "My DApp").
- `appIcon` (optional): URL to your DApp’s icon (e.g., "https://my-dapp.com/icon.png").
- `appDescription` (optional): Brief description of your DApp.
- `appUrl` (optional): Your DApp’s URL.
- `walletConnectProjectId` (optional): WalletConnect project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).
- `keylessWalletConfig` (optional): Configuration for Keyless wallet:
  - `chainId` (optional): Blockchain chain ID (e.g., 2020 for Ronin Mainnet).
  - `clientId`: Your client ID for authentication.
  - `waypointOrigin` (optional): Waypoint service URL (e.g., "https://waypoint.roninchain.com").
  - `popupCloseDelay` (optional): Delay (ms) before closing the popup (e.g., 1000).

See [Wagmi Configuration Docs](https://wagmi.sh/core/config) for advanced options.

### TantoProvider Configuration

Customize the widget’s behavior with the `config` prop.

```tsx
<TantoProvider
  config={{
    disableProfile: true,
    hideConnectSuccessPrompt: true,
    initialChainId: 2021,
  }}
>
  {/* Your App */}
</TantoProvider>
```

**Options**:

- `disableProfile` (boolean): Hides wallet address, avatar, and profile modal after connection.
- `hideConnectSuccessPrompt` (boolean): Skips the success animation (~1.5s) after connection.
- `initialChainId` (number): Target chain ID for the widget (e.g., 2021 for Ronin Testnet).

### Custom Connect Button

Create a custom connection button using the render prop pattern.

```tsx
import { TantoConnectButton } from '@sky-mavis/tanto-widget';

function CustomButton() {
  return (
    <TantoConnectButton>
      {({ isConnected, showModal, address, chainId }) =>
        isConnected ? (
          <p>
            {address} ({chainId})
          </p>
        ) : (
          <button onClick={showModal}>Connect Wallet</button>
        )
      }
    </TantoConnectButton>
  );
}
```

### TantoEmbeddedWidget

Embed the wallet connection UI directly in your page instead of a modal.

```tsx
import { TantoEmbeddedWidget } from '@sky-mavis/tanto-widget';

function Page() {
  return <TantoEmbeddedWidget />;
}
```

### useTantoModal Hook

Programmatically control the wallet connection modal.

```tsx
import { useTantoModal } from '@sky-mavis/tanto-widget';

function ModalControl() {
  const { open, show, hide } = useTantoModal();

  return (
    <div>
      <button onClick={show}>Open Modal</button>
      <button onClick={hide}>Close Modal</button>
      <p>Modal is {open ? 'open' : 'closed'}</p>
    </div>
  );
}
```

## 🔗 RNS - Ronin Name Service

Tanto Widget provides convenient hooks for working with **Ronin Name Service (RNS)**:

- `useRnsName` – Retrieves the primary name associated with a given wallet address.
- `useRnsAddress` – Resolves a Ronin name to its corresponding wallet address.

```tsx
const name = useRnsName({ address: '0x123...abc' }); // Returns e.g. "vitalik.ron"
const address = useRnsAddress({ name: 'vitalik.ron' }); // Returns e.g. "0x123...abc"
```

## Migrating from Ethers.js

If your project currently uses Ethers.js, you can migrate to Viem (the default provider for Wagmi v2) by following the official [Wagmi migration guide](https://wagmi.sh/react/guides/ethers). This guide covers how to update your hooks and provider setup for compatibility with Wagmi.
