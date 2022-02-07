import React, { useEffect, useState } from 'react';
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

export const Home = (): JSX.Element => {
  const [state, setState] = useState<IToken[]>([]);
  const { active, chainId, account } = useWeb3React();

  useEffect(() => {
    (async function getData() {
      try {
        if (active && chainId && account) {
          const data = await axios.get(
            urlBuilder({ account }), // Use Mainnet
            // urlBuilder({ chainId, account }),
          );

          const { items } = data.data.data;

          const newState = items
            .filter(filterNFTsOnly)
            .map(parseNFTdata)
            .flat();

          setState(newState);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    })();
  }, [active, chainId, account]);

  if (!active) {
    return (
      <div className={styles.container}>
        Please connect with your Metamask to continue
      </div>
    );
  }

  if (!state.length) {
    return (
      <div className={styles.container}>
        <p>No products added. Go to Admin page and add some.</p>
        {/* TODO: Add input field for different address */}
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
