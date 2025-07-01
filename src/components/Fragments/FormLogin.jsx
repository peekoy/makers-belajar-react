import InputForm from '../Elements/Input';
import AuthLayout from '../../components/Layouts/AuthLayouts';
import { forwardRef } from 'react';

const FormLogin = forwardRef(({ onSubmit, children }, ref) => {
  return (
    <AuthLayout title='Login' type='login'>
      <form onSubmit={onSubmit}>
        <InputForm
          label='Username'
          type='text'
          placeholder='John Doe'
          name='username'
          ref={ref}
        />
        <InputForm
          label='Password'
          type='password'
          placeholder='*****'
          name='password'
        />
        {children}
      </form>
    </AuthLayout>
  );
});

export default FormLogin;
