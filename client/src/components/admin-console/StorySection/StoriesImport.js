import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getStoriesAdminConsole } from '../../../actions/story';

import AccordionComponent from '../../layout/Accordion/AccordionComponent';

const StoriesImport = ({ getStoriesAdminConsole, story: { stories, loading }, getElement }) => {
  useEffect(() => {
    getStoriesAdminConsole()
  }, [getStoriesAdminConsole]);

  return loading || stories === null ? (
    <Spinner />
  ) : (
      <AccordionComponent title="Stories" comp="Stories" content={stories} getElem={getElement} />
    )

}

StoriesImport.propTypes = {
  getStoriesAdminConsole: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  story: state.story
});

export default connect(mapStateToProps, { getStoriesAdminConsole })(StoriesImport);