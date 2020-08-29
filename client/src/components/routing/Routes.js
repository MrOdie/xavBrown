import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../Dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
// import AddExperience from '../profile-forms/AddExperience';
// import AddEducation from '../profile-forms/AddEducation';
import IndividualStory from '../story/IndividualStory';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Stories from '../story/Stories';
// import Posts from '../posts/Posts';
//import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

import classes from '../../assets/scss/modules/routes.module.scss';

const Routes = props => {
  return (
    <section className={classes.container}>
      <Alert/>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/stories" component={Stories} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/stories/:slug" component={IndividualStory} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        {/* <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} /> */}
        {/* <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} /> */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
