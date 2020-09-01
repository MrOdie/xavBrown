import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import classes from '../../assets/scss/modules/commentItem.module.scss';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  isAuthenticated,
  deleteComment
}) => (
    <div className={classes.post}>
      <div className={classes.user}>
        <Link className={classes.userLink} to={`/profile/${user}`}>
          <h4>{name}</h4>
        </Link>
      </div>
      <div className={classes.content}>
        <p className={classes.comment}>{text}</p>
        <p className={classes.date}>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
      </div>
      {
        isAuthenticated === true ? (
          !auth.loading && user === auth.user._id && (
            <button
              onClick={() => deleteComment(postId, _id)}
              type='button'
              className={`btn btn-danger no-padding no-font-weight ${classes.button}`}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )
        ) : ''
      }
    </div>
  );

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
