import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { useThemeSetup } from './lib/theme';

// Components
import MainLayout from './layouts/MainLayout';
import Home from './pages';

// Styles
import styles from './App.module.scss';

function getLibrary(provider: any): any {
  console.log('provider ', provider);
  return new ethers.providers.Web3Provider(provider);
}

const App = (): JSX.Element => {
  useThemeSetup();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MainLayout className={styles.container}>
        <Home />
      </MainLayout>
    </Web3ReactProvider>
  );
};

export default App;
