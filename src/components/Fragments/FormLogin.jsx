import InputForm from '../Elements/Input';
import Button from '../Elements/Button';
import { useState, useEffect, useRef } from 'react';
import { login } from '../../services/auth.service';

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // localStorage.setItem('username', event.target.email.value);
    // localStorage.setItem('password', event.target.password.value);
    // console.log('login');
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem('token', res);
        window.location.href = '/products';
      } else {
        setLoginFailed(res.response.data);
      }
    });
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  });

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
