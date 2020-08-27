import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';

import classes from '../../assets/scss/modules/landingPage.module.scss';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Layout page="landingPage">
      <section className={classes.landingPage}>
        <div className={classes.overlay}>
          <div className={classes.intro}>
            <h1>Xavier Brown</h1>
            <h3>This is a Xavier Brown Game, built using the MERN Stack</h3>
            <div className={classes.buttons}>
              <Link to='/login' className={classes.login}>Login</Link>
              <Link to='/register' className={classes.register}>Register</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
