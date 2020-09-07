import React from 'react';

const AddNewStory = () => {
  return (
    <section>
      <article>
        <form className="form">
          <label htmlFor="storyTitle">Title</label>
          <input type="text" placeholder="Story Title" />
          <label htmlFor="storyDescription">Description</label>
          <input type="text" placeholder="Story Description" />
          <p>Published</p>
          <div className="radioGroup">
            <div className="radioSubGroup">
              <input className="radioInput" type="radio" name="isPublished" id="published" value="published" />
              <label className="radioLabel" htmlFor="published">Published</label>
            </div>
            <div className="radioSubGroup">
              <input className="radioInput" type="radio" name="isPublished" id="draft" value="draft" />
              <label className="radioLabel" htmlFor="draft">draft</label>
            </div>
          </div>
        </form>
      </article>
    </section>
  )
}

export default AddNewStory;