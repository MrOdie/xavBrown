import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addStory } from '../../../actions/story';
import { setAlert } from '../../../actions/alert';

const AddNewStory = ({ setAlert, addStory, closeModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublished: false
  });

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

    setFormData({ ...formData, [e.target.name]: inputContent });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const check = validate(formData);

    if (!check) {
      return false;
    }

    addStory(formData);
    closeModal();
  }
  return (
    <section className="createStoryModal">
      <article>
        <form id="createStory" className="form" onSubmit={onSubmit}>
          <input
            type="text"
            id="title"
            placeholder="Story Title"
            className="title"
            name="title"
            value={title}
            onChange={onChange} />
          <textarea
            className="addStoryDesc"
            type="text"
            id="description"
            name="description"
            placeholder="Story Description"
            value={description}
            onChange={onChange} />
          <div className="radioGroup">
            <div className="radioSubGroup">
              <p>By clicking the following button, you will publish this story.</p>
              <input
                className="radioInput"
                type="checkbox"
                name="isPublished"
                id="published"
                checked={isPublished}
                value={isPublished}
                onChange={onChange} />
              <label className="radioLabel" htmlFor="published">Published</label>
            </div>
          </div>
          <div className="margin-top-1 text-right">
            <button className="btn btn-dark-alt">Create Story</button>
          </div>
        </form>
      </article>
    </section>
  )
}

AddNewStory.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addStory: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, addStory }
)(AddNewStory);