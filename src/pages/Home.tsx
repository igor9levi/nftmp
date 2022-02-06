import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Components
import Text from '../common/text';
import NFTCard from '../components/nftCard';

// Types
import { IToken } from '../types';

// Utils
import { urlBuilder, isNFT } from '../utils';

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

        // TODO: remove any
        const newState = items
          .filter((nft: any) => isNFT(nft.supports_erc) && nft.nft_data?.[0])
          .map((nft: any) => ({
            // TODO: nft_data can be array of more then 1 element
            // TODO:  token_url & external_link to show address 0x00...
            tokenId: nft.nft_data[0]?.token_id,
            thumbnail: nft.nft_data[0]?.external_data.image,
            tokenAddress: nft.nft_data[0]?.token_url,
            link: nft.nft_data[0]?.external_data?.external_url,
          }));

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
        <Text>Home Page</Text>
      )}
    </div>
  );
};

export default Home;
