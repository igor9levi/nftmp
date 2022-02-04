import React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import Button from './common/button/Button';
import { useThemeSetup } from './lib/theme';
import ThemeModeToggle from './components/themeModeToggle';

const App = (): JSX.Element => {
  useThemeSetup();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button size="lg" onClick={() => alert('hello')}>
          &#x1F31E; &#x1F31C;
        </Button>
        <Button size="lg" onClick={() => alert('hello')}>
          <span dangerouslySetInnerHTML={{ __html: '&#x1F31E; &#x1F31C;' }} />
        </Button>
        <ThemeModeToggle />
      </header>
    </div>
  );
};

export default App;
