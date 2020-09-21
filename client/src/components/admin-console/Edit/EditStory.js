import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStoryById, editStory } from '../../../actions/story';
import { setAlert } from '../../../actions/alert';

import Spinner from '../../layout/Spinner';

const EditStory = ({ getStoryById, story: { story, loading }, editStory, setAlert, closeModal, storyInfo }) => {
  useEffect(() => {
    getStoryById(storyInfo[1]);
  }, [getStoryById, storyInfo]);

  // https://daveceddia.com/useeffect-hook-examples/

  const [updatedFormData, setUpdatedFormData] = useState({
    description: '',
    isPublished: '',
    version: ''
  })

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    return () => {
      // reset values on unmount
      setDataLoaded(false);
      setUpdatedFormData({
        description: '',
        isPublished: '',
        version: ''
      });
    }
  }, [])

  useEffect(() => {
    // gotta pass in the story._id === storyInfo[1] bc I want to wait until the correct story is loaded.
    if (story !== null && dataLoaded !== true && story._id === storyInfo[1]) {
      setUpdatedFormData({
        description: story.description,
        isPublished: story.isPublished,
        version: story.__v
      });
      setDataLoaded(true);
    }
  }, [story, dataLoaded, storyInfo])

  const validate = (data) => {
    let isValid, dataArr, validateArr, i;

    isValid = true;
    dataArr = [];
    validateArr = [];

    // convert obj to array if the obj key or value is empty
    for (const prop in data) {
      if (data[prop] === '') {
        dataArr.push(prop);
      }
    }

    // add error messages for each error
    for (i = 0; i < dataArr.length; i++) {
      if (dataArr[i] === 'title') {
        validateArr.push(' a unique title');
      } else if (dataArr[i] === 'description') {
        validateArr.push(' a description');
      } else {
        validateArr.push(' to designate whether this is a draft or published story');
      }
      setAlert(`You need ${validateArr}`, 'danger')
      isValid = false;
    }

    return isValid;
  }

  const onChange = (e) => {
    let inputContent;

    if (e.target.type === 'checkbox') {
      inputContent = e.target.checked
    } else {
      inputContent = e.target.value
    }
    setUpdatedFormData({ ...updatedFormData, [e.target.name]: inputContent });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const check = validate(updatedFormData);

    if (!check) {
      return false;
    }

    editStory(story._id, updatedFormData);
    closeModal();
  }

  return (
    <>
      {
        loading || story === null ? (
          <Spinner />
        ) : (
            <section>
              <article>
                <form id="editStory" className="form" onSubmit={onSubmit}>
                  <label htmlFor="description"><strong>Please enter your new Description:</strong></label>
                  <textarea
                    className="addStoryDesc"
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Story Description"
                    value={updatedFormData.description}
                    onChange={onChange} />
                  <div className="checkBoxGroup">
                    <div className="checkBoxSubGroup">
                      <p><strong>By clicking the following button, you will publish this story.</strong></p>
                      <input
                        className="checkBoxInput"
                        type="checkbox"
                        name="isPublished"
                        id="published"
                        checked={updatedFormData.isPublished}
                        value={updatedFormData.isPublished}
                        onChange={onChange} />
                      <label className="checkBoxLabel" htmlFor="published">Published</label>
                    </div>
                  </div>
                  <div className="margin-top-1 text-right">
                    <button className="btn btn-dark-alt">Update Story</button>
                  </div>
                </form>
              </article>
            </section>
          )
      }
    </>
  )
}

EditStory.propTypes = {
  getStoryById: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  editStory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  story: state.story
})

export default connect(
  mapStateToProps,
  { getStoryById, setAlert, editStory })(EditStory);