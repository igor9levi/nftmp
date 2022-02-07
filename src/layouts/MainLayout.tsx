import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';

// Components
import Header from '../components/header';

// Styles
import styles from './mainLayout.module.scss';
import UnsupportedNetwork from '../components/unsupportedNetwork';

const cx = classNames.bind(styles);

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({
  children,
  className,
}: MainLayoutProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { activate, error } = useWeb3React();

  useEffect(() => {
    setIsLoading(true);
    injected.isAuthorized().then(async (authorized) => {
      if (authorized) {
        await activate(injected);
      }
      setIsLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error && error.constructor === UnsupportedChainIdError) {
    return <UnsupportedNetwork />;
  }

  return (
    <>
      <Header metamaskLoading={isLoading} />
      <main className={cx([styles.main, className])}>{children}</main>
    </>
  );
};

MainLayout.defaultProps = {
  className: '',
};

export default MainLayout;
