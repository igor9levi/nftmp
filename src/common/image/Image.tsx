import React, { useState } from 'react';
import classnames from 'classnames/bind';

// Styles
import styles from './image.module.scss';

// Types
import { IImage } from '../../types';

import FALLBACK_IMAGE from '../../assets/oops.png';
import PLACEHODER_IMAGE from '../../assets/placeholder_286.png';

const cx = classnames.bind(styles);

export const Image = ({
  className,
  src,
  alt,
  ...props
}: IImage): JSX.Element => {
  const [source, setSource] = useState(src);
  const [loaded, setLoaded] = useState(false);

  const handleOnLoad = (): void => {
    setLoaded(true);
  };

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ): void => {
    // eslint-disable-next-line no-console
    console.error(`Missing image: ${(event.target as HTMLImageElement).src}`);
    setSource(FALLBACK_IMAGE);
  };

  return (
    <span>
      {!loaded ? (
        <img
          className={cx(styles.image, className)}
          alt="Placeholder"
          src={PLACEHODER_IMAGE}
        />
      ) : null}
      <img
        className={cx(styles.image, className)}
        src={source}
        alt={alt}
        onError={imageOnErrorHandler}
        onLoad={handleOnLoad}
        {...props}
      />
    </span>
  );
};

Image.defaultProps = {
  className: '',
  alt: '...',
};

export default Image;
