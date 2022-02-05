import React from 'react';
// import { useEthers } from '@usedapp/core';

// const AuthGuardian = ({
//   authComponent: AuthComponent,
//   nonAuthComponent: NonAuthComponent,
// }) => {
//   const { account } = useEthers();

//   if (account) {
//     return <AuthComponent account={account} />;
//   }

//   return <NonAuthComponent />;
// };

// AuthGuardian.propTypes = {
//   authComponent: PropTypes.func.isRequired,
//   nonAuthComponent: PropTypes.func.isRequired,
// };

export const AuthGuardian = (): JSX.Element => <div>AuthGuardian</div>;

export default AuthGuardian;
