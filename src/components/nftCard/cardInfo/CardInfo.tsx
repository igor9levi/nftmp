import React from 'react';
import { IToken } from '../../../types';

// Components
import Text from '../../../common/text';

// Styles
import styles from './cardInfo.module.scss';

// Utils
import { outboundLinkBuilder } from '../../../utils';
import Button from '../../../common/button';
import { useModal } from '../../../hooks/useModal';

interface CardInfoProps {
  content: IToken;
}

const CardInfo = ({ content }: CardInfoProps): JSX.Element => {
  const { tokenId, contractAddress } = content;
  const { open } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.cardInfo}>
        <div className={styles.tokenIdInfo}>
          <div className={styles.tokenIdLabel}>Token ID</div>
          <Text className={styles.tokenId}>{tokenId}</Text>
        </div>
        <div className={styles.tokenAddressInfo}>
          <Text className={styles.tokenLabel}>Token Address</Text>
          <div className={styles.tokenAddress}>
            <a
              target="_blank"
              href={outboundLinkBuilder(contractAddress)}
              rel="noreferrer"
            >
              {contractAddress}
            </a>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          open(content);
        }}
      >
        Transfer NFT to another account
      </Button>
    </div>
  );
};

export default CardInfo;
