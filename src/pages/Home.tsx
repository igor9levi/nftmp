import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [state, setState] = useState<IToken[] | null>(null);

  useEffect(() => {
    (async function getData() {
      try {
        const data = await axios.get(
          urlBuilder({ chainId: '1', address: 'demo.eth' }),
        );

        const { items } = data.data.data;

        const newState = items.filter(filterNFTsOnly).map(parseNFTdata);

        setState(newState);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className={styles.content}>
      {state ? (
        state.map((card: IToken) => <NFTCard key={card.tokenId} token={card} />)
      ) : (
        <Text>Login to Metamask to see your NFTs</Text>
      )}
    </div>
  );
};

export default Home;
