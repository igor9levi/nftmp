import { InjectedConnector } from '@web3-react/injected-connector';

const ChainIds = {
  Mainnet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  Polygon: 137,
  Localhost: 1337,
};

export const injected = new InjectedConnector({
  supportedChainIds: [...Object.values(ChainIds)],
});
