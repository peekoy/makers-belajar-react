import {
  login as loginService,
  getUsername,
} from '../../services/auth.service';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';

export const login = (data) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const token = await loginService(data);
    localStorage.setItem('token', token);
    const username = getUsername(token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { username },
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data
      : 'Invalid credentials';
    dispatch({
      type: LOGIN_FAILURE,
      payload: errorMessage,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
