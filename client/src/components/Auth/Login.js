import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

import Layout from '../layout/Layout';
import classes from '../../assets/scss/modules/login.module.scss';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    console.log(isAuthenticated);
    return <Redirect to="/dashboard" />;
  }

  return (
    <Layout page="login">
      <section className={classes.login}>
        <article className={classes.loginContainer}>
          <h1>Login</h1>
          <h4>Login to your account</h4>
          <form className={classes.form} onSubmit={onSubmit}>
            <input
              type="text"
              id="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              required />
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required />
            <button className={classes.loginButton}>Login</button>
          </form>
          <p>Don't have a profile? <Link to="/register"><strong>Sign up</strong></Link> today!</p>

        </article>
      </section>
    </Layout>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
