import React, { Fragment } from "react"
import PropTypes from "prop-types"

import Header from '../layout/Header';
import classes from "../../assets/scss/modules/layout.module.scss";

const Layout = ({ children, page }) => {

  return (
    <Fragment>
      <Header parent={page} />
      <div className={classes[page]}>
        {children}
      </div>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
