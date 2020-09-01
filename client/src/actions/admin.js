import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_USERS,
  ERROR_GET_USERS
} from './types';

export const getAllUsers = () => async dispatch => {
  console.log('hello')
  try {
    const res = await api.get('/users/all');
    console.log(res);
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
    
  } catch (err) {
    console.log('no, here')
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ERROR_GET_USERS
    });
  }
}