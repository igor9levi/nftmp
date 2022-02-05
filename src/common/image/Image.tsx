import React, { useState } from 'react';
import classnames from 'classnames/bind';

// Styles
import styles from './image.module.scss';

// Types
import { IImage } from '../../types';

import FALLBACK_IMAGE from '../../assets/oops.png';

const cx = classnames.bind(styles);

export const Image = ({
  className,
  src,
  alt,
  ...props
}: IImage): JSX.Element => {
  const [source, setSource] = useState(src);

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ): void => {
    setSource(FALLBACK_IMAGE);
  };

  return (
    <img
      className={cx(styles.image, className)}
      src={source}
      alt={alt}
      {...props}
      onError={imageOnErrorHandler}
    />
  );
};

Image.defaultProps = {
  className: '',
  alt: '...',
};

export default Image;
