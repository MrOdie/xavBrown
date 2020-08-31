import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStories } from '../../actions/story';

import Spinner from '../layout/Spinner';
import Story from './Story';
import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

import classes from '../../assets/scss/modules/stories.module.scss';

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
        <SingleColumn>
          <section className={classes.storyBody}>

            <article className={classes.heading}>
              <h1>Xavier's Chronicles</h1>
            </article>
            <article className={classes.stories}>
              {
                stories.map((story) => (
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