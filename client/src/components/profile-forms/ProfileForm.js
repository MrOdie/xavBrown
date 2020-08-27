import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Layout from '../layout/Layout';
import SingleColumn from '../layout/singleColumn';
// import classes from '../../assets/scss/modules/profileForm.module.scss';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Layout page='create-profile'>
      <SingleColumn>

        <h1>Edit Your Profile</h1>
        <p className="lead">
          <FontAwesomeIcon icon={faUser} /> Add some changes to your profile
      </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <select name="status" value={status} onChange={onChange}>
              <option>* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <p className="form-text">
              Give us an idea of where you are at in your career
          </p>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={onChange}
            />
            <p className="form-text">
              Could be your own company or one you work for
          </p>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={onChange}
            />
            <p className="form-text">
              Could be your own or a company website
          </p>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={onChange}
            />
            <p className="form-text">
              City &amp; state suggested (eg. Boston, MA)
          </p>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={onChange}
            />
            <p className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </p>
          </div>
          <div className="form-textbox">
            <p className="form-text">Tell us a little about yourself</p>
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              rows="5"
              value={bio}
              onChange={onChange}
            />
          </div>
          <div className="my-2">
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type="button"
              className="btn btn-secondary"
            >
              Add Social Network Links
          </button>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <section className="social-input">
                <div className="form-group">
                  <i className="fab fa-twitter fa-2x" />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    value={twitter}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <i className="fab fa-facebook fa-2x" />
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <i className="fab fa-youtube fa-2x" />
                  <input
                    type="text"
                    placeholder="YouTube URL"
                    name="youtube"
                    value={youtube}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <i className="fab fa-linkedin fa-2x" />
                  <input
                    type="text"
                    placeholder="Linkedin URL"
                    name="linkedin"
                    value={linkedin}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <i className="fab fa-instagram fa-2x" />
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={instagram}
                    onChange={onChange}
                  />
                </div>
              </section>
            </Fragment>
          )}
          <p><strong><small>* = required field</small></strong></p>
          <div className="form-footer">
            <Link className="btn contain left" to="/dashboard">
              <FontAwesomeIcon icon={faArrowLeft} />
              Go Back
            </Link>
            <input type="submit" className="btn btn-primary contain right" />
          </div>

        </form>
      </SingleColumn>

    </Layout>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
