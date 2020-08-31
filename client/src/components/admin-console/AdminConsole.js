import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminConsole = ({ auth: { user }}) => {
  useEffect(() => {
    
  });
  
  return (
    <div>
      <h1>Admin Console</h1>
    </div>
  )
}

AdminConsole.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(AdminConsole);