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
      <h2>{posts.title}</h2>
      {
        posts.map(post => (
          <Post key={post._id} post={post} />
        ))
      }
      <p>{posts.name}</p>
      {/* <Post /> */}
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