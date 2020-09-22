import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from '../../../assets/scss/modules/editPost.module.scss';

const EditPost = () => {

  const keyPress = (e) => {
    const elem = e.currentTarget;

    if (elem.value.length > 0) {
      elem.parentNode.classList.add('active');
    } else {
      elem.parentNode.classList.remove('active');
    }
  }
  const Submit = () => {
    console.log('submit');
  }
  return (
    <section>
      <article>
        <form id="editPost" className="form" onSubmit={Submit}>
          <label className="editDescription margin-bottom-1" htmlFor="editDescription">
            <span className="editDescriptionSpan">Update the Description</span>
            <input id="editDescription" type="text" onKeyUp={keyPress} />
          </label>
          <label className="editMarkdown margin-bottom-1" htmlFor="editMarkdown">
            <span className="editMarkdownSpan">Update the Markdown</span>
            <input id="editMarkdown" type="text" onKeyUp={keyPress} />
          </label>
          <label className="editStatus margin-bottom-1" htmlFor="editStatus">
            <span className="editStatusSpan">Update the Status</span>
            <input id="editStatus" type="text"  onKeyUp={keyPress}/>
          </label>

          <div className="margin-top-1 text-right">
            <button className="btn btn-dark-alt">Update Post</button>
          </div>
        </form>
      </article>
    </section>
  )
}

export default EditPost;