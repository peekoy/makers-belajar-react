import { login as loginService } from '../../services/auth.service';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';

export const login = (data, callback) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const token = await loginService(data);
    localStorage.setItem('token', token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { username: data.username },
    });
    callback(true);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
    callback(false, error.message);
  }
};

export const logout = () => ({
  type: LOGOUT,
});
