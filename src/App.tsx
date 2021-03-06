import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { useThemeSetup } from './lib/theme';

// Components
import MainLayout from './layouts/MainLayout';
import Home from './pages';

// Styles
import styles from './App.module.scss';
import TransferModal from './components/transferModal';

// Library itself uses type any
// https://github.com/Uniswap/interface/blob/main/src/utils/getLibrary.ts#L13
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLibrary(provider: any): any {
  return new ethers.providers.Web3Provider(provider);
}

const App = (): JSX.Element => {
  useThemeSetup();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MainLayout className={styles.container}>
        <Home />
        <TransferModal />
      </MainLayout>
    </Web3ReactProvider>
  );
};

export default App;
