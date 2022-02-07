import { InjectedConnector } from '@web3-react/injected-connector';
import { ChainIds } from './const';

export const injected = new InjectedConnector({
  // To support multi chains:
  // supportedChainIds: [...Object.values(ChainIds)],
  supportedChainIds: [ChainIds.Localhost, ChainIds.Mainnet],
});
