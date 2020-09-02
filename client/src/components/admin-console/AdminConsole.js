import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import { getAllUsers } from '../../actions/admin';
import Users from './UserSection/Users';

const AdminConsole = ({ getAllUsers, admin: {users, loading}, adminUser }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return loading && users !== null ? (
    <Spinner />
  ) : (
      <>
        {
          users.map((user) => (
            <Users key={user._id} user={user}/>
            ))
        }
        <h2 className="h1"> {adminUser.name}&#39;s Admin Console</h2>
      </>
    )
}

AdminConsole.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  admin: state.admin
})

export default connect(
  mapStateToProps, { getAllUsers }
)(AdminConsole);