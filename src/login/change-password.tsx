import * as React from 'react';
import { ErrorType } from './login-page';
import { LoginError } from './login-error';

interface Props {
  onPasswordChangeSubmit: (password: string, confirmPassword: string) => void;
  isFormDisabled: boolean;
  errorType: ErrorType | undefined;
}

export const ChangePassword = ({ onPasswordChangeSubmit, isFormDisabled, errorType }: Props) => {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwordElement = event.currentTarget.elements['password'];
    const passwordConfirmElement = event.currentTarget.elements['password-confirm'];
    onPasswordChangeSubmit(passwordElement.value, passwordConfirmElement.value);
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit}>
      <div className="field">
        <label className='label'>Password</label>
        <div className="control">
          <input type="password" className="input" id="password" placeholder='Password' disabled={isFormDisabled} />
        </div>
      </div>
      <div className="field">
        <label className='label'>Confirm Password</label>
        <div className="control">
          <input type="password" className="input" id="password-confirm" placeholder='Confirm Password' disabled={isFormDisabled} />
        </div>
      </div>
      {errorType && <LoginError errorType={errorType} />}
      <div className="field">
        <div className="control">
          <button className="button is-success" disabled={isFormDisabled}>Change Password</button>
        </div>
      </div>
    </form>
  );
};