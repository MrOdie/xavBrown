import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';

import Post from './Post';

// import classes from '../../assets/scss/modules/posts.module.scss';

const Posts = ({ getPosts, post: { posts, loading }, storyId }) => {
  useEffect(() => {
    getPosts(storyId);
  }, [getPosts, storyId])

  return loading && posts !== null ? (
    <Spinner />
  ) : (
      <>
        {
          posts.filter(post => post.isPublished === true).map(post => (
            <Post key={post._id} post={post} />
          ))
        }
      </>
    )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);