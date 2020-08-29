import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

import Story from './Story';
import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

import classes from '../../assets/scss/modules/stories.module.scss';

const Stories = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts])

  return (
    <Layout page="stories">
      <SingleColumn>
        <h1>Stories</h1>
        <div className={classes.stories}>
          {
            posts.map((post) => (
              <Story key={post._id} post={post}/>
            ))
          }
        </div>
      </SingleColumn>
    </Layout>
  )
}

Stories.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect( mapStateToProps, { getPosts })(Stories);