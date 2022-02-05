import React from 'react';
import classNames from 'classnames/bind';

// Components
import Header from '../components/header';

// Styles
import styles from './mainLayout.module.scss';

const cx = classNames.bind(styles);

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout = ({
  children,
  className,
}: MainLayoutProps): JSX.Element => (
  <>
    <Header />
    <main className={cx([styles.main, className])}>{children}</main>
  </>
);

MainLayout.defaultProps = {
  className: '',
};

export default MainLayout;
