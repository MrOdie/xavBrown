import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';

const Post = ({
  deletePost,
  auth,
  post: { _id, title, storySlug, slug, markdown },
  showActions
}) => {
  return (
    <div className="content">
      <div className="inner">
        <Link to={`/stories/${storySlug}/${slug}`}>
          <h3>{title}</h3>
          <p>{markdown}</p>
        </Link>
      </div>
    </div>
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
  {deletePost}
) (Post);