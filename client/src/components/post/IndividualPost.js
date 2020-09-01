import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';

import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';

import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

import classes from '../../assets/scss/modules/individualPost.module.scss';

const IndividualPost = ({ getPost, post: { post, loading }, isAuthenticated, match }) => {
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
          <section className={classes.post}>

            <h2 className="h1">{post.title}</h2>
            <ReactMarkdown source={post.markdown} />
          </section>
          <section className={classes.comments}>
            {
              isAuthenticated === true ? (
                <CommentForm postId={post._id} />
              ) : (
                  <h3>Comments:</h3>
                )
            }
            <div className="comments">
              {post.comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
              ))}
            </div>
          </section>
        </SingleColumn>
      </Layout>
    )
}

IndividualPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getPost })(IndividualPost);