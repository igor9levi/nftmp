import React from 'react';
import { IToken } from '../../../../types';

// Components
import Text from '../../../../common/text';

// Styles
import styles from './cardInfo.module.scss';

interface CardInfoProps {
  content: IToken;
}

const CardInfo = ({ content }: CardInfoProps): JSX.Element => {
  const { tokenId, type, tokenAddress, link } = content;

  return (
    <div className={styles.cardInfo}>
      <Text>{tokenId}</Text>
      <Text>{type}</Text>
      <Text>{tokenAddress}</Text>
      <Text>{link}</Text>
    </div>
  );
};

export default CardInfo;
