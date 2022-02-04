import React from 'react';
import classnames from 'classnames/bind';
import { noop } from '../../utils';

import styles from './button.module.scss';

const cx = classnames.bind(styles);

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  ghost?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'sm' | 'md' | 'lg';
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

/**
 * Primary UI component for user interaction
 */
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
