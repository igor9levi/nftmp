import React from 'react';

// Components
import Text from '../../../text';
import Icon from '../../../icon/Icon';

// Utils
// import { capitalize } from '../../../../../utils/helpers';

// Styles
import styles from './cardInfo.module.scss';

const CardInfo = ({ content }) => {
  const {
    type,
    price,
    title,
    collection,
    onSale,
    currency,
    saleEndDateAndTime,
  } = content;

  return (
    <div className={styles.cardInfo}>
      <div className={styles.generalInfo}>
        <div className={styles.description}>
          <div className={styles.collection}>{collection}</div>
          <Text className={styles.title}>{title}</Text>
        </div>
        {onSale && (
          <div className={styles.priceInfo}>
            <Text className={styles.priceLabel}>Price</Text>
            <div className={styles.amount}>{`${price || ''} ${
              price ? currency : 'N/A'
            }`}</div>
          </div>
        )}
      </div>
      <div className={styles.typeInfo}>
        <div className={styles.typeDescription}>
          <Icon name={type} size={15} className={styles.typeIcon} />
          {/* <span>{capitalize(type)}</span> */}
        </div>
        {onSale && <div>{saleEndDateAndTime}</div>}
      </div>
    </div>
  );
};

export default CardInfo;
