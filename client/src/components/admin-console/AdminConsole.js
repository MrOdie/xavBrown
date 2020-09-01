import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import { getAllUsers } from '../../actions/admin';

const AdminConsole = ({ getAllUsers, admin: { users, loading }, adminUser }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  console.log('hello')

  return loading || users === null ? (
    <>
      <Spinner />
    </>
  ) : (
      <>
        {console.log(loading)}
      hello
      </>
    )
  // return (
  //   <div>
  //     <h1>{adminUser.name}&#39;s Admin Console</h1>
  //     {console.log(getAllUsers())}
  //   </div>
  // )
}

AdminConsole.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.users,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps, { getAllUsers }
)(AdminConsole);