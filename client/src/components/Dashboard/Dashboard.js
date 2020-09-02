import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';

import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';
import AdminConsole from '../Admin-Console/AdminConsole';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Layout page="dashboard">

      <SingleColumn>
        {profile !== null ? (
          user.role !== null ? (
            <>
              <AdminConsole adminUser={user} />
              <div className="my-2">
                <button className="btn btn btn-danger" onClick={() => deleteAccount()}>
                  <i className="fas fa-user-minus" /> Delete My Account
                </button>
              </div>
            </>
          ) : (
              <Fragment>
                <h2 className="h1">Dashboard</h2>
                <p className="lead">
                  <i className="fas fa-user" /> Welcome {user && user.name}
                </p>
                <DashboardActions />
                <div className="my-2">
                  <button className="btn btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus" /> Delete My Account
                    </button>
                </div>
              </Fragment>
            )
        ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary">
                Create Profile
                      </Link>
            </Fragment>
          )}
      </SingleColumn>
    </Layout>

  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
