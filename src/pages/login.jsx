import { Link } from 'react-router-dom';
import FormLogin from '../components/Fragments/FormLogin';
import AuthLayout from '../components/Layouts/AuthLayouts';
import { login } from '../redux/auth/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    dispatch(
      login(data, (success, errorMessage) => {
        if (success) {
          navigate('/products');
        } else {
          console.log(errorMessage);
        }
      })
    );
  };

  return (
    <FormLogin onSubmit={handleLogin}>
      {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
      <Button type='submit' classname='bg-blue-600 w-full' disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </FormLogin>
  );
};

export default LoginPage;
