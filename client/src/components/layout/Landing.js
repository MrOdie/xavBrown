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
        <div className={classes.overlay} />
        <div className={classes.intro}>
          <h2>
            The
            <br />Xavier Brown
            <br />Chronicles
          </h2>
          <p><strong>This site represents a compilation of short stories and other works that have been produced by Xavier Brown.</strong></p>
          <p><strong>While this is a passion project, it is the hope of the author that you enjoy your time here.</strong></p>
          <div className={classes.buttons}>
            <Link to='/stories/' className={classes.stories}>View Stories</Link>
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
