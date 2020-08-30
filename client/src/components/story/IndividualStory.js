import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getStory } from '../../actions/story';

import Posts from '../post/Posts';
import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

const IndividualStory = ({ getStory, story: { story, loading }, match }) => {
  useEffect(() => {
    getStory(match.params.slug);
  }, [getStory, match.params.slug])

  return loading || story === null ? (
    <Layout page="storyPage">
      <SingleColumn>    
        <Spinner />
      </SingleColumn>
    </Layout>
  ) : (
      <Layout page="storyPage">
        <SingleColumn>
          <h2>{story.title}</h2>
          <Posts storyId={story._id}/>
        </SingleColumn>
      </Layout>
    )
}

IndividualStory.propTypes = {
  getStory: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  story: state.story
})

export default connect(mapStateToProps, { getStory })(IndividualStory);