import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStoryById, editStory } from '../../../actions/story';
import { setAlert } from '../../../actions/alert';

import Spinner from '../../layout/Spinner';

const EditStory = ({ getStoryById, story: { story, loading }, editStory, setAlert, closeModal, storyInfo }) => {
  useEffect(() => {
    getStoryById(storyInfo[1]);
  }, [getStoryById, storyInfo[1]]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublished: ''
  });
  const [updatedFormData, setUpdatedFormData] = useState({
    description: '',
    isPublished: ''
  })
  
  const { title, description, isPublished } = formData;

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
    console.log(inputContent);
    setUpdatedFormData({ ...updatedFormData, [e.target.name]: inputContent });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(updatedFormData);
    return
    const check = validate(updatedFormData);

    if (!check) {
      return false;
    }

    editStory(updatedFormData);
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
                <form id="createStory" className="form" onSubmit={onSubmit}>
                  <input
                    type="text"
                    id="title"
                    placeholder="Story Title"
                    name="title"
                    value={story.title}
                    onChange={onChange} />
                  <textarea
                    className="addStoryDesc"
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Story Description"
                    value={story.description}
                    onChange={onChange} />
                  <div className="radioGroup">
                    <div className="radioSubGroup">
                      <p>By clicking the following button, you will publish this story.</p>
                      <input
                        className="radioInput"
                        type="checkbox"
                        name="isPublished"
                        id="published"
                        checked={story.isPublished}
                        value={story.isPublished}
                        onChange={onChange} />
                      <label className="radioLabel" htmlFor="published">Published</label>
                    </div>
                  </div><button className="btn btn-dark-alt margin-top-2">Submit</button>
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