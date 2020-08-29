import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStories } from '../../actions/story';

import Story from './Story';
import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

import classes from '../../assets/scss/modules/stories.module.scss';

const Stories = ({ getStories, story: { stories } }) => {
  useEffect(() => {
    getStories();
  }, [getStories])

  return (
    <Layout page="stories">
      <SingleColumn>
        <h1>Stories</h1>
        <div className={classes.stories}>
          {
            stories.map((story) => (
              <Story key={story._id} story={story}/>
            ))
          }
        </div>
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

export default connect( mapStateToProps, { getStories })(Stories);