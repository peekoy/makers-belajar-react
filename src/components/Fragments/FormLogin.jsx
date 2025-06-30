import InputForm from '../Elements/Input';
import Button from '../Elements/Button';
import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState('');
  const { login, isLoggedIn } = useContext(AuthContext);

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault();
      const data = {
        username: event.target.username.value,
        password: event.target.password.value,
      };
      login(data, (status, res) => {
        if (status) {
          window.location.href = '/products';
        } else {
          setLoginFailed(res.response?.data || 'Login failed');
        }
      });
    },
    [login, setLoginFailed]
  );

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/products';
    }
  }, [isLoggedIn]);

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label='Username'
        type='text'
        placeholder='John Doe'
        name='username'
        ref={usernameRef}
      />
      <InputForm
        label='Password'
        type='password'
        placeholder='*****'
        name='password'
      />
      <Button classname='bg-blue-600 w-full' type='submit'>
        Login
      </Button>
      {loginFailed && (
        <p className='text-red-500 text-center mt-5'>{loginFailed}</p>
      )}
    </form>
  );
};

export default FormLogin;
