import { createContext, useState, useEffect } from 'react';
import { login as authLogin, getUsername } from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const username = getUsername(token);
        setUser({ username });
      } catch (error) {
        console.log('Invalid token:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [token]);

  const login = (data, callback) => {
    authLogin(data, (status, res) => {
      if (status) {
        localStorage.setItem('token', res);
        setToken(res);
        const username = getUsername(res);
        setUser({ username });
        callback(true);
      } else {
        callback(false, res);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  };

  const authData = {
    user,
    token,
    loading,
    login,
    logout,
    isLoggedIn: !!token,
  };

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
