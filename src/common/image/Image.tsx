import React from 'react';
import classnames from 'classnames/bind';

// Styles
import styles from './image.module.scss';

// Types
import { IImage } from '../../types';

const cx = classnames.bind(styles);

export const Image = ({
  className,
  src,
  alt,
  ...props
}: IImage): JSX.Element => (
  <img className={cx(styles.image, className)} src={src} alt={alt} {...props} />
);

Image.defaultProps = {
  className: '',
  alt: '...',
};

Image.defaultProps = {
  alt: '',
  className: '',
};

export default Image;
