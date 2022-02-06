import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';

// Components
import ThemeModeToggle from '../themeModeToggle';

// Styles
import styles from './header.module.scss';
import Button from '../../common/button';

export const Header = (): JSX.Element => {
  const { active, activate, deactivate } = useWeb3React();

  const connect = useCallback(async (): Promise<void> => {
    try {
      await activate(injected);
    } catch (err) {
      console.error(err);
    }
  }, [activate]);

  const disconnect = useCallback(async (): Promise<void> => {
    try {
      await deactivate();
    } catch (err) {
      console.error(err);
    }
  }, [deactivate]);

  return (
    <header>
      <div className={styles.wrapper}>
        <div>
          <ThemeModeToggle />
          <h1 className={styles.title}>NFT Marketplace</h1>
        </div>
        <div>
          {active ? (
            <Button onClick={disconnect}>Logout</Button>
          ) : (
            <Button onClick={connect}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
