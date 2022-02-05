import React from 'react';
import { IToken } from '../../../types';

// Components
import Text from '../../../common/text';

// Styles
import styles from './cardInfo.module.scss';

interface CardInfoProps {
  content: IToken;
}

const CardInfo = ({ content }: CardInfoProps): JSX.Element => {
  const { tokenId, tokenAddress, link } = content;

  return (
    <div className={styles.cardInfo}>
      <div className={styles.tokenIdInfo}>
        <div className={styles.tokenIdLabel}>Token ID</div>
        <Text className={styles.tokenId}>{tokenId}</Text>
      </div>
      <div className={styles.tokenAddressInfo}>
        <Text className={styles.tokenLabel}>Token Address</Text>
        <div className={styles.tokenAddress}>
          <a href={link}>{tokenAddress}</a>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
