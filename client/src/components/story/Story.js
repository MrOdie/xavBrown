import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteStory } from '../../actions/story';

import classes from '../../assets/scss/modules/story.module.scss';

const Story = ({
  deleteStory,
  auth,
  story: { _id, owner, title, description, date, slug },
  showActions
}) => {
  return (
    <Link className={classes.content} to={`/stories/${slug}`}>
      <div className={classes.inner}>
        <p className={`h3 ${classes.title}`}>{title}</p>
        <p>{description}</p>
      </div>
    </Link>
  )
}

Story.defaultProps = {
  showActions: true
};

Story.propTypes = {
  story: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteStory: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { deleteStory }
)(Story);