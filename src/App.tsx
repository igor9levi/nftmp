import React from 'react';
import { useThemeSetup } from './lib/theme';

// Components
import MainLayout from './layouts/MainLayout';
import Home from './pages';

// Styles
import styles from './App.module.scss';

const App = (): JSX.Element => {
  useThemeSetup();

  return (
    <MainLayout className={styles.container}>
      <Home />
    </MainLayout>
  );
};

export default App;
