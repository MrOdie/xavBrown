import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getAllUsers } from '../../../actions/admin';

import AccordionComponent from '../../layout/Accordion/AccordionComponent';
import classes from '../../../assets/scss/modules/users.module.scss';

const Users = ({ getAllUsers, admin: { users, loading } }) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return loading && users !== null ? (
    <Spinner />
  ) : (
      <AccordionComponent title="Users" comp="Users" content={users} />
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