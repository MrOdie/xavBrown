import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getStoryBySlug } from '../../actions/story';

import Posts from '../post/Posts';
import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

import classes from '../../assets/scss/modules/individualStory.module.scss';

const IndividualStory = ({ getStoryBySlug, story: { story, loading }, match }) => {
  useEffect(() => {
    getStoryBySlug(match.params.slug);
  }, [getStoryBySlug, match.params.slug])

  return (
    <>
      <Layout page='storyPage'>
        <SingleColumn>
          {
            loading || story === null ? (
              <Spinner />
            ) : (
                <section className={classes.post}>
                  <article className={`h1 ${classes.header}`}>
                    {story.title}
                  </article>
                  <article className={classes.posts}>
                    <Posts storyId={story._id} />
                  </article>
                </section>
              )
          }
        </SingleColumn>
      </Layout>
    </>
  )

}

IndividualStory.propTypes = {
  getStoryBySlug: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  story: state.story
})

export default connect(mapStateToProps, { getStoryBySlug })(IndividualStory);