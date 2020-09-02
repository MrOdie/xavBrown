import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_USERS,
  ERROR_GET_USERS
} from './types';

export const getAllUsers = () => async dispatch => {
  try {
    const res = await api.get('/users/all');

    dispatch({
      type: GET_USERS,
      payload: res.data
    })
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ERROR_GET_USERS
    });
  }
}