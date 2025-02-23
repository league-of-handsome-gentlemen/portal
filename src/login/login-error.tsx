import { ErrorType } from './login-page';

interface Props {
  errorType: ErrorType;
}

export const LoginError = ({ errorType }: Props) => (
  <p className='mb-2 has-text-danger'>
    {errorType === 'PASSWORD_MATCH' && 'Passwords must match'}
    {errorType === 'INVALID_PASSWORD' && 'Password must be at least 8 characters, one Uppercase letter, one lowercase letter, one number, and one special character'}
    {errorType === 'NOT_AUTHORIZED' && 'Incorrect Email or Password'}
    {errorType === 'OTHER' && 'Something went wrong'}
  </p>
);