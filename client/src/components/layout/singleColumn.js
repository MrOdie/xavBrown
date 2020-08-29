import React from 'react';

import classes from '../../assets/scss/modules/singleColumn.module.scss';

const SingleColumn = ({sectionId, children}) => {
  return (
    <section id={sectionId} className={classes.Section}>
      <article className={classes.Article}>
        {children}
      </article>
    </section>
  )
}

export default SingleColumn;