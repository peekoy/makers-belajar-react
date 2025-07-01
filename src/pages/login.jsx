import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormLogin from '../components/Fragments/FormLogin';
import Button from '../components/Elements/Button';
import { login } from '../redux/auth/actions';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/products');
    }
  }, [user, navigate]);

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    dispatch(login(data));
  };

  return (
    <FormLogin onSubmit={handleLogin} ref={usernameRef}>
      {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
      <Button type='submit' classname='bg-blue-600 w-full' disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </FormLogin>
  );
};

export default LoginPage;
