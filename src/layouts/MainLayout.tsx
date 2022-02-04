import React from 'react';
// Components
// import NonAuthNavigation from '../common/nonAuthNavigation';
// import Navigation from '../common/navigation';
// import AuthGuardian from '../common/authGuardian/AuthGuardian';
// import Menu from '../common/menu/Menu';
// import AuthGuardian from '../common/authGuardian';

// Styles
import styles from './mainLayout.module.scss';

// export const MainLayout = ({ children }) => (
//   <>
//     <AuthGuardian
//       authComponent={(props) => <Navigation {...props} />}
//       // nonAuthComponent={(props) => <NonAuthNavigation {...props} />}
//       nonAuthComponent={(props) => <Navigation {...props} />}
//     />
//     <main className={styles.main}>
//       <Menu />
//       <div className={styles.content}>{children}</div>
//     </main>
//   </>
// );

export const MainLayout = (): JSX.Element => <div>Main Layout</div>;

export default MainLayout;
