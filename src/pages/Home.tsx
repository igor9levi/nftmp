import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';

// Components
import Text from '../common/text';
import NFTCard from '../components/nftCard';

// Types
import { IToken } from '../types';

// Utils
import { urlBuilder, filterNFTsOnly, parseNFTdata } from '../utils';

// Styles
import styles from './home.module.scss';
import Button from '../common/button';

export const Home = (): JSX.Element => {
  const [state, setState] = useState<IToken[]>([]);
  const [address, setAddress] = useState('');
  const [shoudShowData, setShoudShowData] = useState(false);
  const { active, account } = useWeb3React();

  const getData = useCallback(async (): Promise<void> => {
    try {
      if (address && shoudShowData) {
        setShoudShowData(false);

        const data = await axios.get(
          // Uses Mainnet. To use other chains add chainId from useWeb3React
          urlBuilder({ account: address }),
        );

        const { items } = data.data.data;

        const newState = items.filter(filterNFTsOnly).map(parseNFTdata).flat();

        setState(newState);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, [address, shoudShowData]);

  useEffect(() => {
    if (active) {
      getData();
    }
  }, [active, getData]);

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
        <p>No NFTs for this wallet address. Add another address manually.</p>
        <div className={styles.container}>
          <input
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <Button onClick={() => setShoudShowData(true)}>Show</Button>
        </div>
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
