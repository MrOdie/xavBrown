import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

import classes from '../../assets/scss/modules/commentForm.module.scss';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className={classes.commentForm}>
      <div className={classes.commentHeading}>
        <h3>Leave a Comment</h3>
      </div>
      <form
        className={`form ${classes.comment}`}
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          className={classes.commentTextArea}
          name='text'
          cols='30'
          rows='5'
          placeholder='What are your thoughts?'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className={`btn btn-dark no-padding no-font-weight ${classes.commentButton}`} value='Comment' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
