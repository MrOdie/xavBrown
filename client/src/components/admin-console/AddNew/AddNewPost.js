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

  const { title, description, markdown, isPublished } = formData;

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

    addPost(story, formData);
    closeModal();
  }
  return (
    <section className="createPostModal">
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
          <div className="checkBoxGroup">
            <div className="checkBoxSubGroup">
              <p className="margin-bottom-none"><strong>By clicking the following button, you will publish this post.</strong></p>
              <input
                className="checkBoxInput"
                type="checkbox"
                name="isPublished"
                id="published"
                checked={isPublished}
                value={isPublished}
                onChange={onChange} />
              <label className="checkBoxLabel" htmlFor="published">Published</label>
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