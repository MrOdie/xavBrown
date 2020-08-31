import React, { Fragment } from "react"
import PropTypes from "prop-types"

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import classes from "../../assets/scss/modules/layout.module.scss";

const Layout = ({ children, page }) => {

  return (
    <Fragment>
      <Header parent={page} />
      <div className={`layout ${classes[page]}`}>
        {children}
      </div>
      <Footer />
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
