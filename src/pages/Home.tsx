import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';

// Components
import Text from '../common/text';
import NFTCard from '../components/nftCard';

// Types
import { CovalentTokenBalanceData, IToken } from '../types';

// Utils
import { urlBuilder, filterNFTsOnly, parseNFTdata } from '../utils';

// Styles
import styles from './home.module.scss';
import Button from '../common/button';

// Hooks
import { useAddress } from '../hooks/useAddress';

type JSONResponse = {
  data: {
    data: {
      items: CovalentTokenBalanceData[];
    };
    error: boolean;
    error_code: null | unknown;
    error_message: null | unknown;
  };
  config: unknown;
  headers: unknown;
  request: unknown;
  status: number;
  statusText: string;
};

export const Home = (): JSX.Element => {
  const [state, setState] = useState<IToken[]>([]);
  const [address, setAddress] = useState('');
  const [isAddressManuallyEntered, setAddressManuallyEntered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { active, account } = useWeb3React();
  const { setCurrentAddress } = useAddress();

  const getData = async (accountAddress: string): Promise<void> => {
    try {
      const data: JSONResponse = await axios.get(
        // Uses Mainnet. To use other chains add chainId from useWeb3React
        urlBuilder({ account: accountAddress }),
      );

      const { items } = data.data.data;

      const newState = items.filter(filterNFTsOnly).map(parseNFTdata).flat();

      setState(newState);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError('Data could not be fetched');
    }
  };

  useEffect(() => {
    if (account) {
      getData(account);
    }
  }, [account]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAddressManuallyEntered(false);
    setAddress(e.target.value);
  };

  const searchHandler = (): void => {
    setAddressManuallyEntered(true);
    setCurrentAddress(address);
    getData(address);
  };

  if (!active) {
    return (
      <div className={styles.container}>
        Please connect with your Metamask to continue
      </div>
    );
  }

  if (!state.length) {
    return (
      <div>
        <div className={styles.heading}>
          <Text>Connected with: {account}</Text>
        </div>
        <p>No NFTs for this wallet address. Add another address manually.</p>
        <div className={styles.container}>
          <input
            className={styles.input}
            onChange={handleOnChange}
            value={address}
          />
          <Button onClick={searchHandler}>Show</Button>
        </div>
        {isAddressManuallyEntered && (
          <div>No NFTs for this address {address}</div>
        )}
        {error && <Text className={styles.error}>{error}</Text>}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Text>Connected with: {account}</Text>
      </div>
      <div className={styles.content}>
        {state.map((card: IToken) => (
          <NFTCard key={card.tokenId} token={card} />
        ))}
      </div>
    </div>
  );
};

export default Home;
