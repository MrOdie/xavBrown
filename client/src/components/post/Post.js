import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';

import classes from '../../assets/scss/modules/post.module.scss';

const Post = ({
  deletePost,
  auth,
  post: { _id, title, storySlug, slug, markdown, description },
  showActions
}) => {
  return (
    <Link className={classes.content} to={`/stories/${storySlug}/${slug}`}>
      <div className={classes.inner}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  )
}

Post.defaultProps = {
  showActions: true
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { deletePost }
)(Post);