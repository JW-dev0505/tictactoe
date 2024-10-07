import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import '@rainbow-me/rainbowkit/styles.css';

// Get default wallets (MetaMask, WalletConnect, etc.)
const config = getDefaultConfig({
  appName: 'TicTacToe',
  projectId: 'SC_MANAGE',
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    {/* <ThirdwebProvider> */}
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    {/* </ThirdwebProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
