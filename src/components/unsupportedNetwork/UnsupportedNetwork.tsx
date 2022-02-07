import React from 'react';
import { ChainIds } from '../../const';

// Components
import Button from '../../common/button';

// Styles
import styles from './unsupportedNetwork.module.scss';

export const UnsupportedNetwork = (): JSX.Element => {
  const handleChangeNetwork = async (): Promise<void> => {
    await window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${ChainIds.Mainnet.toString(16)}` }],
    });
  };

  return (
    <div className={styles.container}>
      <p>Unsupported network!</p>
      <p className={styles.note}>
        Please switch to <strong>Mainnet</strong> network in order to use this
        app.
      </p>
      <Button onClick={handleChangeNetwork}>Switch to Mainnet</Button>
    </div>
  );
};

export default UnsupportedNetwork;
