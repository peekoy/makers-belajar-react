import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const login = async (data) => {
  const res = await axios.post('https://fakestoreapi.com/auth/login', data);
  console.log(res.data);
  return res.data.token;
};

export const getUsername = (token) => {
  const decoded = jwtDecode(token);
  return decoded.user;
};
