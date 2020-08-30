import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';

import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

const IndividualPost = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.slug, match.params.id);
  }, [getPost, match.params.slug, match.params.id])

  return loading || post === null ? (
    <Layout page="postPage">
      <SingleColumn>    
        <Spinner />
      </SingleColumn>
    </Layout>
  ) : (
      <Layout page="postPage">
        <SingleColumn>
          {console.log(post[0]._id)}
          <h2>{post[0].title}</h2>
          <p>{post[0].markdown}</p>
          <p>hello there</p>

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