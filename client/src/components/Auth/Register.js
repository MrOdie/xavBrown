import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import Layout from '../layout/Layout';
import classes from '../../assets/scss/modules/register.module.scss';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, userName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = (param) => {
    let isValid, dataArr, validateArr, i;

    isValid = true;
    dataArr = [];
    validateArr = [];

    for (const prop in param) {
      if (param[prop] === '') {
        dataArr.push(prop);
      }
    }

    for (i = 0; i < dataArr.length; i++) {
      if (dataArr[i] === 'name') {
        validateArr.push(' your Name');
      } else if (dataArr[i] === 'email') {
        validateArr.push(' an Email');
      } else if (dataArr[i] === 'userName') {
        validateArr.push(' a Username');
      } else if (dataArr[i] === 'password') {
        validateArr.push(' Password');
      } else {
        validateArr.push(' and Confirm your password');
      }
      setAlert(`Please enter: ${validateArr}`, 'danger')
      isValid = false;
    }

    if (isValid) {
      if (param.password !== param.password2) {
        setAlert('Passwords do not match', 'danger');
        isValid = false;
      }
    }

    return isValid;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const check = validate(formData);

    if (!check) {
      console.log(check)
      return false;
    }

    register({ name, userName, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Layout page="register">
      <section className={classes.register}>
        <article className={classes.registerContainer}>
          <h1>Register</h1>
          <h4>Register your account</h4>
          <form className={classes.form} onSubmit={onSubmit}>
            <input type="text" id="name" placeholder="John Doe" name="name" value={name} onChange={onChange} />
            <input type="text" id="userName" placeholder="Username" name="userName" value={userName} onChange={onChange} />
            <input type="email" id="email" placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={onChange} />
            <input type="password" id="password2" placeholder="Confirm Password" name="password2" value={password2} onChange={onChange} />
            <button className={classes.registerButton}>Register</button>
          </form>
        </article>
      </section>
    </Layout>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
