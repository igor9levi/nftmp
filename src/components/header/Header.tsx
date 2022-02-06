import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';

// Components
import ThemeModeToggle from '../themeModeToggle';

// Styles
import styles from './header.module.scss';
import Button from '../../common/button';

export const Header = (): JSX.Element => {
  const { active, chainId, account, library, connector, activate, deactivate } =
    useWeb3React();

  // TODO: useCallback
  async function connect(): Promise<void> {
    try {
      await activate(injected);
    } catch (err) {
      console.error(err);
    }
  }

  async function disconnect(): Promise<void> {
    try {
      await deactivate();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <header>
      <div className={styles.wrapper}>
        <div>
          <ThemeModeToggle />
          <h1 className={styles.title}>NFT Marketplace</h1>
        </div>
        <div>
          {account ? (
            <Button onClick={() => disconnect()}>Logout</Button>
          ) : (
            <Button onClick={() => connect()}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
