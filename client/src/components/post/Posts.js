import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

import Post from './Post';
import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

import classes from '../../assets/scss/modules/posts.module.scss';

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts])

  return (
    <Layout page="posts">
      <SingleColumn>
        <h1>Posts</h1>
        <div className={classes.posts}>
          {
            posts.map((post) => (
              <Post key={post._id} post={post}/>
            ))
          }
        </div>
      </SingleColumn>
    </Layout>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect( mapStateToProps, { getPosts })(Posts);