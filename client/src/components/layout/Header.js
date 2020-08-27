import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/Auth';

import { useScrollHandler } from '../../hooks/useScrollHandler';
import classes from '../../assets/scss/modules/header.module.scss';

const Header = ({ auth: { isAuthenticated, loading }, logout, parent }) => {
  const scroll = useScrollHandler();

  const authLinks = (
    <ul>
      <li className={classes.navLink}>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li className={classes.navLink}>
        <Link to='/posts'>Posts</Link>
      </li>
      <li className={classes.navLink}>
        <Link to='/dashboard'>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li className={classes.navLink}>
        <a onClick={logout} href='#!'>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li className={classes.navLink}>
        <Link to='/register'>Register</Link>
      </li>
      <li className={classes.navLink}>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <header id="Header" className={!scroll ? `${classes.mainHeader} ${classes.scrolled} ${classes[parent]}` : `${classes.mainHeader} ${classes[parent]}`} >

      <div className={classes.logo}>
        <Link to="/"><h2 className="h1">Trivia</h2></Link>
      </div>

      <input type="checkbox" id="menu-btn" className={classes.menuBtn} />
      <label htmlFor="menu-btn" className={classes.menuIcon}>
        <span className={classes.menuIconLine}></span>
      </label>
      <nav className={classes.navLinks}>
        {!loading && (
          <Fragment>
            {isAuthenticated ? authLinks : guestLinks}
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
