import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_STORIES,
  STORY_ERROR,
  DELETE_STORY,
  ADD_STORY,
  GET_STORY,
  ADD_OG_COMMENT,
  REMOVE_OG_COMMENT
} from './types';

// Get stories
export const getStories = () => async dispatch => {
  try {
    const res = await api.get('/stories');

    dispatch({
      type: GET_STORIES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Delete story
export const deleteStory = id => async dispatch => {
  try {
    await api.delete(`/storys/${id}`);

    dispatch({
      type: DELETE_STORY,
      payload: id
    });

    dispatch(setAlert('Story Removed', 'success'));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add story
export const addStory = formData => async dispatch => {
  try {
    const res = await api.post('/storys/', formData);

    dispatch({
      type: ADD_STORY,
      payload: res.data
    });

    dispatch(setAlert('Story Created', 'success'));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get story
export const getStory = slug => async dispatch => {
  try {
    const res = await api.get(`stories/s/${slug}`);
    console.log(res);
    dispatch({
      type: GET_STORY,
      payload: res.data
    });
  } catch (err) {

    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add og_comment
export const addOg_Comment = (postId, formData) => async dispatch => {
  try {
    const res = await api.post(`/storys/og_comment/${postId}`, formData);

    dispatch({
      type: ADD_OG_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Og_Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete og_comment
export const deleteOg_Comment = (postId, og_commentId) => async dispatch => {
  try {
    await api.delete(`/storys/og_comment/${postId}/${og_commentId}`);

    dispatch({
      type: REMOVE_OG_COMMENT,
      payload: og_commentId
    });

    dispatch(setAlert('Og_Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};