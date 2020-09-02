import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../Dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import Stories from '../story/Stories';
import IndividualStory from '../story/IndividualStory';
import IndividualPost from '../post/IndividualPost';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

import classes from '../../assets/scss/modules/routes.module.scss';

const Routes = props => {
  return (
    <section className={classes.container}>
      <Alert />
      <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/stories" component={Stories} />
          <Route exact path="/stories/:slug" component={IndividualStory} />
          <Route exact path="/stories/:slug/:id" component={IndividualPost} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={ProfileForm} />
          <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
          <Route component={NotFound} />

      </Switch>
    </section>
  );
};

export default Routes;
