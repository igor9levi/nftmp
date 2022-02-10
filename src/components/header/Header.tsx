import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';

// Components
import ThemeModeToggle from '../themeModeToggle';

// Styles
import styles from './header.module.scss';
import Button from '../../common/button';

// Utils
import { getErrorMessage } from '../../utils';

type HeaderProps = {
  metamaskLoading?: boolean;
};

export const Header = ({ metamaskLoading }: HeaderProps): JSX.Element => {
  const { active, activate, deactivate } = useWeb3React();
  const [error, setError] = useState('');

  const connect = async (): Promise<void> => {
    setError('');

    try {
      if (!window.ethereum) {
        throw new Error('Please install Metamask.');
      }

      await activate(injected);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError(getErrorMessage(err));
    }
  };

  const disconnect = async (): Promise<void> => {
    setError('');

    try {
      await deactivate();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError(getErrorMessage(err));
    }
  };

  return (
    <header>
      <div className={styles.wrapper}>
        <div>
          <ThemeModeToggle />
          <h1 className={styles.title}>NFT Marketplace</h1>
        </div>
        {error && <div className={styles.error}>{error}</div>}
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
