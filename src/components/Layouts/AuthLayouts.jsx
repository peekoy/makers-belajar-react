import { Link } from 'react-router-dom';

const AuthLayout = (props) => {
  const { children, title, type } = props;
  return (
    <div className='flex h-dvh justify-center items-center'>
      <div className='w-full max-w-xs'>
        <h1 className='text-3xl font-bold mb-2 text-blue-600'>{title}</h1>
        <p className='font-medium text-slate-500 mb-8'>
          Welcome, Please enter your details
        </p>
        {children}
        <p className='text-sm mt-5 text-center'>
          {type === 'login'
            ? `Don't have an account?`
            : 'Already have an account?'}{' '}
          <Link
            to={type === 'login' ? '/register' : '/login'}
            className='font-bold text-blue-600'
          >
            {type === 'login' ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
