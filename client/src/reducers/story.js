import {
  GET_STORIES,
  STORY_ERROR,
  DELETE_STORY,
  ADD_STORY,
  GET_STORY,
  EDIT_STORY,
  ADD_OG_COMMENT,
  REMOVE_OG_COMMENT
} from '../actions/types';

const initialState = {
  stories: [],
  story: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action){
  const { type, payload } = action;

  switch (type) {
    case GET_STORIES:
      return {
        ...state,
        stories: payload,
        loading: false
      }
    case GET_STORY:
      return {
        ...state,
        story: payload,
        loading: false
      }
    case ADD_STORY:
      return {
        ...state,
        stories: [payload, ...state.stories],
        loading: false
      }
    case EDIT_STORY:
      return {
        ...state,
        stories: [payload, ...state.stories],
        loading: false
      }
    case DELETE_STORY:
      return {
        ...state,
        stories: state.stories.filter(story => story._id !== payload),
        loading: false
      }
    case STORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case ADD_OG_COMMENT:
      return {
        ...state,
        stories: { ...state.story, og_comments: payload },
        loading: false
      }
    case REMOVE_OG_COMMENT:
      return {
        ...state,
        story: {
          ...state.story,
          og_comments: state.story.og_comments.filter(
            og_comment => og_comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}