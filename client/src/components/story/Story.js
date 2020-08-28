import React from 'react';
import PropTypes from 'prop-types';
import { link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';

const Story = ({
  deletePost,
  auth,
  post: { _id, owner, title, date },
  showActions
}) => {
  return (
    <div>
      <h1>{_id}</h1>
      <h2>{owner}</h2>
      <h3>{title}</h3>
      <h4>{date}</h4>
    </div>
  )
}

Story.defaultProps = {
  showActions: true
};

Story.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {deletePost}
) (Story);