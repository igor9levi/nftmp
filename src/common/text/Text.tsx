import React from 'react';
import classnames from 'classnames/bind';
import { IText } from '../../types';

// Styles
import styles from './text.module.scss';

const cx = classnames.bind(styles);

const Text = ({ children, size, className }: IText): JSX.Element => (
  <p className={cx(styles.text, { [styles[`text-${size}`]]: true }, className)}>
    {children}
  </p>
);

Text.defaultProps = {
  className: '',
  size: 'md',
};

export default Text;
