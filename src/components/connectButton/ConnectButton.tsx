import React from 'react';
import classNames from 'classnames/bind';

import Button from '../../common/button';
import { noop } from '../../utils';
import styles from './connectButton.module.scss';

const cx = classNames.bind(styles);

// interface HeaderProps {
//   onLogin: () => void;
//   onLogout: () => void;
// }

const onLogout = noop;
const onLogin = noop;

interface ConnectButtonProps {
  className?: string;
}

// export const Header = ({ onLogin, onLogout }: HeaderProps): JSX.Element => {
export const ConnectButton = ({
  className,
}: ConnectButtonProps): JSX.Element => {
  // TODO: useAuth()
  const account = false;

  return account ? (
    <Button onClick={onLogout} className={cx(styles.login, className)}>
      Log Out
    </Button>
  ) : (
    <Button onClick={onLogin} className={cx(styles.logout, className)}>
      Log In
    </Button>
  );
};

ConnectButton.defaultProps = {
  className: '',
};

export default ConnectButton;
