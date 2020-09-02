import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getAllUsers } from '../../../actions/admin';

import User from './User';
import classes from '../../../assets/scss/modules/users.module.scss';

const Users = ({ getAllUsers, admin: { users, loading } }) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])
  
  return loading && users !== null ? (
    <Spinner />
  ) : (
    <section className={classes.users}>
      <h4>Users</h4>
      {
        users.map((user) => (
          <User key={user._id} user={user} />
        ))
      }
    </section>
  )
}

Users.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  admin: state.admin
})

export default connect(
  mapStateToProps, { getAllUsers }
)(Users);