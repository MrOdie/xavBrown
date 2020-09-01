import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import { useScrollHandler } from '../../hooks/useScrollHandler';
import classes from '../../assets/scss/modules/header.module.scss';

const Header = ({ auth: { isAuthenticated, loading }, logout, parent }) => {
  const scroll = useScrollHandler();

  const authLinks = (
    <Fragment>
      <li className={classes.navLink}>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li className={classes.navLink}>
        <a onClick={logout} href='/'>
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className={classes.navLink}>
        <Link to='/register'>Register</Link>
      </li>
      <li className={classes.navLink}>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <header id="Header" className={parent !== undefined ? (
      !scroll ? (
        `${classes.mainHeader} ${classes.scrolled} ${classes[parent]}`
      ) : (
        `${classes.mainHeader} ${classes[parent]}`
      )
    ) : (
      !scroll ? (
        `${classes.mainHeader} ${classes.scrolled}`
      ) : (
        `${classes.mainHeader}`
      )
    )} >

      <div className={classes.logo}>
        <Link to="/"><h2 className="h1">XBC</h2></Link>
      </div>

      <input type="checkbox" id="menu-btn" className={classes.menuBtn} />
      <label htmlFor="menu-btn" className={classes.menuIcon}>
        <span className={classes.menuIconLine}></span>
      </label>
      <nav className={classes.navLinks}>
        {!loading && (
          <Fragment>
            <ul>
              <li className={classes.navLink}>
                <Link to="/stories">Stories</Link>
              </li>
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </Fragment>
        )}
      </nav>

    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
