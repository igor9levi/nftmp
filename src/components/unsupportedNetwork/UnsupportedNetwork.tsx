import React, { useState } from 'react';
import { ChainIds } from '../../const';

// Components
import Button from '../../common/button';
import Text from '../../common/text';

// Styles
import styles from './unsupportedNetwork.module.scss';

// Utils
import { getErrorMessage } from '../../utils';

export const UnsupportedNetwork = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);

  const handleChangeNetwork = async (): Promise<void> => {
    try {
      setError('');
      await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${ChainIds.Mainnet.toString(16)}` }],
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code === '4001') {
        // EIP-1193 userRejectedRequest error
        setError(getErrorMessage('Please connect to MetaMask.'));
      } else {
        setError(getErrorMessage(err.message));
      }
    }
  };

  return (
    <div className={styles.container}>
      <p>Unsupported network!</p>
      <p className={styles.note}>
        Please click on the button to switch to <strong>Mainnet</strong>{' '}
        network.
      </p>
      <Button onClick={handleChangeNetwork}>Switch to Mainnet</Button>
      {error && <Text className={styles.error}>{error}</Text>}
    </div>
  );
};

export default UnsupportedNetwork;
