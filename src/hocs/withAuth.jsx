import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [user, navigate]);

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
