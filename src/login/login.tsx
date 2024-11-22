import * as React from 'react';
import { ErrorType } from './login-page';
import { LoginError } from './login-error';

interface Props {
  onLoginSubmit: (email: string, password: string) => void;
  isFormDisabled: boolean;
  errorType: ErrorType | undefined;
}

export const Login = ({ onLoginSubmit, isFormDisabled, errorType }: Props) => {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailElement = event.currentTarget.elements['email'];
    const passwordElement = event.currentTarget.elements['password'];
    onLoginSubmit(emailElement.value, passwordElement.value);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="field">
        <label className='label'>Email</label>
        <div className="control">
          <input type="text" className="input" id="email" placeholder='Email Address' disabled={isFormDisabled} />
        </div>
      </div>
      <div className="field">
        <label className='label'>Password</label>
        <div className="control">
          <input type="password" className="input" id="password" placeholder='Password' disabled={isFormDisabled} />
        </div>
      </div>
      {errorType && <LoginError errorType={errorType} />}
      <div className="field">
        <div className="control">
          <button className="button is-success" disabled={isFormDisabled}>Login</button>
        </div>
      </div>
    </form>
  );
};