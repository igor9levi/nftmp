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
  const { tokenId, type, tokenAddress, link } = content;

  return (
    <div className={styles.cardInfo}>
      <div className={styles.cardInfo}>
        <div className={styles.generalInfo}>
          <div className={styles.description}>
            <div className={styles.collection}>Token ID</div>
            <Text className={styles.title}>{tokenId}</Text>
          </div>
          <div className={styles.priceInfo}>
            <Text className={styles.priceLabel}>Type</Text>
            <div className={styles.amount}>{type}</div>
          </div>
        </div>
        <div className={styles.typeInfo}>
          <div className={styles.typeDescription}>
            <span>{tokenAddress}</span>
          </div>
          <a href={link}>Link</a>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
