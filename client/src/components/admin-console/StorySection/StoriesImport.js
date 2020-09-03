import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getStories } from '../../../actions/story';

import AccordionComponent from '../../layout/Accordion/AccordionComponent';

const StoriesImport = ({ getStories, story: { stories, loading } }) => {
  useEffect(() => {
    getStories()
  }, [getStories]);

  return loading || stories === null ? (
    <Spinner />
  ) : (
      <>
        <AccordionComponent title="Stories" comp="Stories" content={stories} />
      </>
    )

}

StoriesImport.propTypes = {
  getStories: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  story: state.story
});

export default connect(mapStateToProps, { getStories })(StoriesImport);