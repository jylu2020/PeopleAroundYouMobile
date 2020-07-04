import { API_ROOT, AUTH_HEADER } from '../../constants/Constants';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const signup = (username, password) => {
  return async dispatch => {
    const response = await fetch(
      `${API_ROOT}/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
    );

    if (!response.ok) {
      throw new Error('Error in register!');
    }

    const resData = await response.text();
    console.log(resData);
    dispatch({ type: SIGNUP });
  };
};

export const login = (username, password) => {
  return async dispatch => {
    const response = await fetch(
      `${API_ROOT}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }
    );

    if (!response.ok) {
      throw new Error('Error in login!');
    }

    const resData = await response.text();
    dispatch({ type: LOGIN, token: `${AUTH_HEADER} ${resData}` });
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch({ type: LOGOUT, token: '' });
  };
};