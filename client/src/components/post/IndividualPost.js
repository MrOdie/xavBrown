import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';

import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

const IndividualPost = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.slug);
  }, [getPost, match.params.slug])

  return loading || post === null ? (
    <Layout page="postPage">
      <SingleColumn>    
        <Spinner />
      </SingleColumn>
    </Layout>
  ) : (
      <Layout page="postPage">
        <SingleColumn>
          <h2>{post.title}</h2>

        </SingleColumn>
      </Layout>
    )
}

IndividualPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost })(IndividualPost);