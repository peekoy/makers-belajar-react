import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/login');
      }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
