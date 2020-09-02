import {
  GET_USERS,
  ERROR_GET_USERS
} from '../actions/types';

const initialState = {
  loading: true,
  users: [],
  user: null,
  error: {}
};

export default function(state = initialState, action){
  const { type, payload } = action;

  switch (type){
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case ERROR_GET_USERS:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default: 
      return state;
  }
}