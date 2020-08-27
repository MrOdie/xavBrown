import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
// import Experience from './Experience';
// import Education from './Education';

import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';

const Dashboard = ({
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
  }, []);

  return (
    <Layout page="dashboard">

      <SingleColumn>

        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            {/* <Experience experience={profile.experience} />
            <Education education={profile.education} /> */}

          </Fragment>
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {})(
  Dashboard
);
