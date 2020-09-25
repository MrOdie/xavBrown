import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById, editPost } from '../../../actions/post';
import { setAlert } from '../../../actions/alert';
import Spinner from '../../layout/Spinner';

// import classes from '../../../assets/scss/modules/editPost.module.scss';

const EditPost = ({ getPostById, post: { post, loading }, setAlert, closeModal, postInfo }) => {
  useEffect(() => {
    getPostById(postInfo[1], postInfo[2])
  }, [getPostById, postInfo])

  const [updatedFormData, setUpdatedFormData] = useState({
    description: '',
    markdown: '',
    version: ''
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    return () => {
      // reset values on unmount
      setDataLoaded(false);
      setUpdatedFormData({
        description: '',
        markdown: '',
        isPublished: '',
        version: ''
      })
    }
  }, [])

  useEffect(() => {

    if (post !== null && dataLoaded !== true && post._id === postInfo[2]) {
      setUpdatedFormData({
        description: post.description,
        markdown: post.markdown,
        isPublished: post.isPublished,
        version: post.__v
      });
      setDataLoaded(true);
    }
  }, [post, dataLoaded, postInfo]);

  const onChange = (e) => {
    let inputContent;
    if (e.target.type === 'checkbox') {
      inputContent = e.target.checked;
    } else {
      inputContent = e.target.value
    }

    setUpdatedFormData({ ...updatedFormData, [e.target.name]: inputContent });
  }

  const keyPress = (e) => {
    const elem = e.currentTarget;

    if (elem.value.length > 0) {
      elem.parentNode.classList.add('active');
    } else {
      elem.parentNode.classList.remove('active');
    }
  }
  const Submit = () => {
    console.log(updatedFormData)
    console.log('submit');
  }
  return (
    <>
      {
        loading || post === null ? (
          <Spinner />
        ) : (
            <section className="editPostModal">
              <article>
                <form id="editPost" className="form" onSubmit={Submit}>
                  <label className="editDescription margin-bottom-1" htmlFor="editDescription">
                    <span className="editDescriptionSpan">Update the Description</span>
                    <input
                      id="editDescription"
                      type="text"
                      onKeyUp={keyPress}
                      name="description"
                      value={updatedFormData.description}
                      onChange={onChange} />
                  </label>
                  <label className="editMarkdown margin-bottom-1" htmlFor="editMarkdown">
                    <span className="editMarkdownSpan">Update the Markdown</span>
                    <textarea
                      id="editMarkdown"
                      type="text"
                      onKeyUp={keyPress}
                      name="markdown"
                      value={updatedFormData.markdown}
                      onChange={onChange} />
                  </label>
                  <div className="checkBoxGroup">
                    <div className="checkBoxSubGroup">
                      <p className="margin-bottom-none"><strong>By clicking the following button, you will publish this post.</strong></p>
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
                    <button className="btn btn-dark-alt">Update Post</button>
                  </div>
                </form>
              </article>
            </section>

          )
      }
    </>
  )
}

EditPost.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { getPostById, setAlert, editPost})(EditPost);