import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { sepolia } from 'wagmi/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: '41d7a64ac6239de6af0dc1c0e429e558',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
