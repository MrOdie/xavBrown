import React from 'react';

import classes from '../../../assets/scss/modules/user.module.scss';

const User = ({ user: { role, name, userName } }) => {
  return (
    <article className={classes.user}>
      <div className={classes.inner}>
        <p>{name}</p>
        <p>{role}</p>
        <p>{userName}</p>
      </div>
    </article>
  )
}

export default User;