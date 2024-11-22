import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import * as Auth from 'aws-amplify/auth';

export const PrivateRoutes = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    Auth.fetchAuthSession().then(session => {
      setIsLoggedIn(session.tokens?.accessToken ? true : false); 
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return <div></div>
  }

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};