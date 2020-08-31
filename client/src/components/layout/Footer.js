import React from 'react';

import classes from '../../assets/scss/modules/footer.module.scss';

const today = new Date();

const Footer = () => (
  <footer>
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.col}>
          <h4 className="h1">The Xavier Brown Chronicles</h4>
          <p><small>EST. 2020 {today.getFullYear() <= 2020 ? '' : <span>&mdash; {today.getFullYear()}</span>}</small></p>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer