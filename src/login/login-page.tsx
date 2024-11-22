import * as React from 'react';
import * as Auth from 'aws-amplify/auth';
import { Navigate } from 'react-router-dom';
import { Login } from './login';
import { ChangePassword } from './change-password';

type LoginScreen = 'LOGIN' | 'CHANGE_PASSWORD';
export type ErrorType = 'NOT_AUTHORIZED' | 'OTHER' | 'PASSWORD_MATCH' | 'INVALID_PASSWORD';


export const LoginPage = () => {
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [hasLoggedIn, setHasLoggedIn] = React.useState(false);
  const [loginError, setLoginError] = React.useState<ErrorType | undefined>(undefined);
  const [loginScreen, setLoginScreen] = React.useState<LoginScreen>('LOGIN');

  React.useEffect(() => {
    Auth.fetchAuthSession().then(session => {
      setHasLoggedIn(session.tokens?.accessToken ? true : false);
    });
  }, []);
  
  const handleError = (e) => {
    setIsLoggingIn(false);

    switch (e.name) {
      case 'NotAuthorizedException':
      case 'UserNotFoundException':
        setLoginError('NOT_AUTHORIZED');
        break;
      case 'UserAlreadyAuthenticatedException':
        setHasLoggedIn(true);
        break
      case 'InvalidPasswordException':
        setLoginError('INVALID_PASSWORD');
        break;
      default:
        setLoginError('OTHER');
    }
    
  }

  const handleLogin = (email: string, password: string) => {
    setIsLoggingIn(true);

    Auth.signIn({ username: email, password: password })
      .then((response) => {
        setIsLoggingIn(false);
        if (response.isSignedIn) {
          setHasLoggedIn(true);
        } else if (response.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
          setLoginError(undefined);
          setLoginScreen('CHANGE_PASSWORD');
        } else {
          setLoginError('OTHER');
        }
      }).catch(handleError);  
  };

  const handlePasswordChange = (password: string, confirmPassword: string) => {
    setIsLoggingIn(false);

    if (password !== confirmPassword) {
      setLoginError('PASSWORD_MATCH');
      return;
    }

    Auth.confirmSignIn({ challengeResponse: password })
      .then(response => {
        if (response.isSignedIn) {
          setHasLoggedIn(true);
        } else {
          setLoginError('OTHER');
        }
      }).catch(handleError);
  };

  if (hasLoggedIn) {
    return <Navigate to='/' />;
  }
 
  return (
    <div id="login-page">
      <div className="columns m-0 is-vcentered is-centered is-flex is-height-100">
        <div className="column is-half-desktop m-4">
          <div className="card">
            <div className="card-header">
              <p className="card-header-title">League of Handsome Gentlemen</p>
            </div>
            <div className="card-content">
              {loginScreen === 'LOGIN' && <Login onLoginSubmit={handleLogin} isFormDisabled={isLoggingIn} errorType={loginError} />}
              {loginScreen === 'CHANGE_PASSWORD' && <ChangePassword onPasswordChangeSubmit={handlePasswordChange} isFormDisabled={isLoggingIn} errorType={loginError} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};