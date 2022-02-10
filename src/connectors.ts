import { InjectedConnector } from '@web3-react/injected-connector';
import { ChainIds } from './const';

export const injected = new InjectedConnector({
  supportedChainIds: [ChainIds.Localhost, ChainIds.Mainnet],
});
