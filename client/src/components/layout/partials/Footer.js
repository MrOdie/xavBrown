import React from 'react';

import classes from '../../assets/scss/modules/footer.module.scss';

const today = new Date();

const Footer = () => (
  <footer>
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.col}>
          <h4 className="h1">Xavier Brown</h4>
          <p><small>EST. 2020 {today.getFullYear() <= 2020 ? '' : <span>&mdash; {today.getFullYear()}</span>}</small></p>
          <h5>Website designed and built by <a className={classes.ohdee} href="https://www.novadev.cc" target="_blank" rel="noopener noreferrer">Mr. OhDee</a></h5>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer