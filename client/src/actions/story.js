import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_STORIES,
  STORY_ERROR,
  DELETE_STORY,
  ADD_STORY,
  GET_STORY,
  EDIT_STORY,
  ADD_OG_COMMENT,
  REMOVE_OG_COMMENT
} from './types';

// Get stories
export const getStoriesAdminConsole = () => async dispatch => {
  try {
    const res = await api.get('/stories/admin');
    dispatch({
      type: GET_STORIES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
// Get stories
export const getStories = () => async dispatch => {
  try {
    const res = await api.get('/stories');
    dispatch({
      type: GET_STORIES,
      payload: res.data
    })
  } catch (err) {
    console.log(err)
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Delete story
export const deleteStory = id => async dispatch => {
  try {
    await api.delete(`/stories/s/${id}`);

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
    const res = await api.post('/stories/', formData);

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
    dispatch(setAlert(err.response.data.msg, 'danger'))
  }
};

// Edit Story
export const editStory = (storyId, formData) => async dispatch => {
  try {
    const res = await api.put(`/stories/s/${storyId}`, formData);

    dispatch({
      type: EDIT_STORY,
      payload: res.data
    })

    dispatch(setAlert('Story Updated', 'success'));
  } catch (err) {
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert(err.response.statusText, 'danger'));
  }
}

// Get story by slug
export const getStoryBySlug = slug => async dispatch => {
  try {
    const res = await api.get(`stories/slug/${slug}`);

    dispatch({
      type: GET_STORY,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: STORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get story by id
export const getStoryById = id => async dispatch => {
  try {
    const res = await api.get(`stories/id/${id}`);

    dispatch({
      type: GET_STORY,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
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