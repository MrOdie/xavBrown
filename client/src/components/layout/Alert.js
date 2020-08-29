import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import classes from '../../assets/scss/modules/alert.module.scss';

const Alert = ({ alerts }) => {
  return (

    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <section key={alert.id} className={classes.backdrop}>
        <article className={`${classes.alert} ${classes[alert.alertType]}`}>
          <h5>
            {alert.alertType === 'danger' ? <FontAwesomeIcon className={classes.icon} icon={faExclamationTriangle} />  : (
              alert.alertType === 'success' ?
              <FontAwesomeIcon icon={faThumbsUp} className={classes.icon}/> : ''
            )}
            {alert.msg}
          </h5>
        </article>
      </section>
    )
    ))
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
