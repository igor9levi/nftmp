import React from 'react';

// Components
import CardInfo from './components/cardInfo';
import Image from '../../common/image';
import { IToken } from '../../types';

// Styles
import styles from './nftCard.module.scss';

// picture, token address, link to Etherscan and token ID

interface NFTCardProps {
  token: IToken;
}

const NFTCard = ({ token }: NFTCardProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {/* Body */}
      <Image src={token.thumbnail} alt="NFT Image" />

      {/* Footer */}
      <CardInfo content={token} />
    </div>
  );
};

export default NFTCard;
