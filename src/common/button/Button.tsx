import React from 'react';
import classnames from 'classnames/bind';
import { noop } from '../../utils';
import { Size } from '../../types';

import styles from './button.module.scss';

const cx = classnames.bind(styles);

interface ButtonProps {
  /**
   * Is button transparent?
   */
  ghost?: boolean;
  /**
   * How large should the button be?
   */
  size?: Size;
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional className
   */
  className?: string;
}

export const Button = ({
  ghost,
  size,
  className,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={cx(styles.button, className, {
        [styles.ghost]: ghost,
        [styles[`button-${size}`]]: true,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  ghost: false,
  size: 'md',
  className: '',
  onClick: noop,
};

export default Button;
