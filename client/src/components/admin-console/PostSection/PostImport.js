import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';

import { getAllPosts } from '../../../actions/post';
import AccordionComponent from '../../layout/Accordion/AccordionComponent';

const PostImport = ({ getAllPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getAllPosts()
  }, [getAllPosts])
  return loading || posts === null ? (
    <Spinner />
  ) : (
    <AccordionComponent title="Posts" comp="Posts" content={posts} />
  )
}

PostImport.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  story: state.story
});

export default connect(mapStateToProps, { getAllPosts })(PostImport);