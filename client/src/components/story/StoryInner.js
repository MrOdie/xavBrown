import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const StoryInner = ({
  auth,
  post: { _id, title, slug }
}) => (
  <div>
    <p>{_id}</p>
    <p>{title}</p>
  </div>
);

StoryInner.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(StoryInner);