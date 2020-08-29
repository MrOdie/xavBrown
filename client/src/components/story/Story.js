import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';

const Story = ({
  deletePost,
  auth,
  post: { _id, owner, title, date, slug },
  showActions
}) => {
  return (
    <div className="content">
      <div className="inner">
        <Link to={`/stories/${slug}`}>
          {title}
        </Link>
      </div>
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