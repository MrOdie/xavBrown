import React from 'react';

import UsersImport from './UserSection/UsersImport';
import StoriesImport from './StorySection/StoriesImport';
import PostImport from './PostSection/PostImport';

import classes from '../../assets/scss/modules/adminConsole.module.scss';

const AdminConsole = ({ adminUser }) => {
  const del = (e) => {
    console.log(e);
  }
  const edit = (e) => {
    console.log(e);
  }
  const add = (e) => {
    console.log(e);
  }

  return (
    <>
      <h2 className="h1">{adminUser.name}&#39;s Admin Console</h2>

      <UsersImport />
      <StoriesImport />
      <PostImport />

      <section className={classes.adminButtons}>
        <article className={classes.buttons}>
          <button className="btn btn-danger" onClick={del}>Delete</button>
          <button className="btn btn-light" onClick={edit}>Edit</button>
          <button className="btn btn-dark-alt" onClick={add}>Add</button>
        </article>
      </section>
    </>
  )
}

export default AdminConsole;