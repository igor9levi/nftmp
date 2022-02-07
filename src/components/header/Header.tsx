import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';

// Components
import ThemeModeToggle from '../themeModeToggle';

// Styles
import styles from './header.module.scss';
import Button from '../../common/button';

type HeaderProps = {
  metamaskLoading?: boolean;
};

export const Header = ({ metamaskLoading }: HeaderProps): JSX.Element => {
  const { active, activate, deactivate } = useWeb3React();

  const connect = useCallback(async (): Promise<void> => {
    try {
      await activate(injected);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, [activate]);

  const disconnect = useCallback(async (): Promise<void> => {
    try {
      await deactivate();
    } catch (err) {
      // eslint-disable-next-line no-console
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
          {active && !metamaskLoading ? (
            <Button onClick={disconnect}>Disconnect</Button>
          ) : (
            <Button onClick={connect}>Connect</Button>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  metamaskLoading: false,
};

export default Header;
