import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStories } from '../../actions/story';

import Spinner from '../layout/Spinner';
import Story from './Story';
import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

import imgLarge from '../../assets/images/story_page_large.jpg';
import imgSmall from '../../assets/images/story_page_small.jpg';
import classes from '../../assets/scss/modules/stories.module.scss';
import Parallax from '../layout/Parallax';

const Stories = ({ getStories, story: { stories, loading } }) => {
  useEffect(() => {
    getStories();
  }, [getStories])

  return loading || stories === null ? (
    <Layout page="stories">
      <SingleColumn>
        <Spinner />
      </SingleColumn>
    </Layout>
  ) : (
      <Layout page="stories">
        <Parallax imgLarge={imgLarge} imgSmall={imgSmall} pageType="story">
          <h1>Xavier's Chronicles</h1>
        </Parallax>
        <SingleColumn>
          <section className={classes.storyBody}>
            <h4 className="h2">Peruse the selection, pick one, get comfortable &amp; go on an adventure.</h4>
            <article className={classes.stories}>
              {
                stories.filter(story => story.isPublished === true).map(story => (
                  <Story key={story._id} story={story} />
                ))
              }
            </article>
          </section>

        </SingleColumn>
      </Layout>
    )
}

Stories.propTypes = {
  getStories: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  story: state.story
});

export default connect(mapStateToProps, { getStories })(Stories);