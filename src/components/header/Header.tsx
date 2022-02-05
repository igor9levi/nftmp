import React from 'react';

// Components
import ThemeModeToggle from '../themeModeToggle';
import ConnectButton from '../connectButton/ConnectButton';

// Styles
import styles from './header.module.scss';

export const Header = (): JSX.Element => {
  return (
    <header>
      <div className={styles.wrapper}>
        <div>
          <ThemeModeToggle />
          <h1 className={styles.title}>NFT Marketplace</h1>
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
