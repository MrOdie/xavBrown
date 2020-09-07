import React from 'react';
import { Redirect } from 'react-router-dom';

import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

// Initial Load
export const initLoadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth');
    console.log(res)
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    const error = err.response;
    console.log('here?')
    console.log(error)
    if (error) {
      return <Redirect to="/stories" />
    }
  }
}
// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    const error = err.response;

    if (error) {
      dispatch(setAlert(error.data.msg, 'danger'))
    }
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err.response);
    const error = err.response;
    const errorMessage = err.response.statusText;
    const errorStatus = err.response.status;
    const altMsg = `Could not log in`

    if (error && errorStatus === 500) {
      dispatch(setAlert(altMsg, 'danger'));
    } else {
      dispatch(setAlert(errorMessage, 'danger'));
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout
export const logout = () => ({ type: LOGOUT });