import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/post';
import { setAlert } from '../../../actions/alert';

const AddNewPost = ({ setAlert, addPost, closeModal, story }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    markdown: '',
    isPublished: ''
  });

  const { title, description, markdown } = formData;

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
      } else if (dataArr[i] === 'markdown') {
        validateArr.push(' the markdown');
      } else {
        validateArr.push(' to designate whether this is a draft or published story');
      }
      setAlert(`You need ${validateArr}`, 'danger')
      isValid = false;
    }

    return isValid;
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const check = validate(formData);

    if (!check) {
      return false;
    }

    addPost(story, formData);
    closeModal();
  }
  return (
    <section>
      <article>
        <form id="createPost" className="form" onSubmit={onSubmit}>
          <input
            type="text"
            id="title"
            placeholder="Post Title"
            className="title"
            name="title"
            value={title}
            onChange={onChange} />
          <textarea
            className="addPostDesc"
            id="description"
            name="description"
            placeholder="Post Description"
            value={description}
            onChange={onChange} />
          <textarea
            className="addPostMarkdown"
            id="markdown"
            placeholder="Post Markdown"
            name="markdown"
            value={markdown}
            onChange={onChange} />
          <div className="radioGroup">
            <div className="radioSubGroup">
              <input
                className="radioInput"
                type="radio"
                name="isPublished"
                id="published"
                value={true}
                onChange={onChange} />
              <label className="radioLabel" htmlFor="published">Published</label>
            </div>
            <div className="radioSubGroup">
              <input
                className="radioInput"
                type="radio"
                name="isPublished"
                id="draft"
                value={false}
                onChange={onChange} />
              <label className="radioLabel" htmlFor="draft">Draft</label>
            </div>
          </div>
          <div className="margin-top-1 text-right">
            <button className="btn btn-dark-alt">Create Post</button>
          </div>
        </form>
      </article>
    </section>
  )
}

AddNewPost.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  story: PropTypes.string.isRequired
};

export default connect(
  null,
  { setAlert, addPost }
)(AddNewPost);