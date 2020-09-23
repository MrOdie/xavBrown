import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get posts
export const getPosts = id => async dispatch => {
  try {
    const res = await api.get(`stories/s/${id}/posts`);

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Get All Posts
export const getAllPosts = () => async dispatch => {
  try {
    const res = await api.get('/stories/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Delete post
export const deletePost = (storyId, postId) => async dispatch => {
  try {
    await api.delete(`/stories/s/${storyId}/p/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = (storyId, formData) => async dispatch => {
  try {
    const res = await api.post(`/stories/s/${storyId}`, formData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getPost = (slug, id) => async dispatch => {
  try {
    const res = await api.get(`/stories/slug/${slug}/p/${id}`);
    console.log(res);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post by ID
export const getPostById = (id, postId) => async dispatch => {
  try {
    const res = await api.get(`/stories/${id}/p/${postId}`);
    console.log(res);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  try {
    const res = await api.post(`/stories/c/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));

    // add a refresh here

  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await api.delete(`/stories/c/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};