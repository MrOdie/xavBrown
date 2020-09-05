import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import UsersImport from './UserSection/UsersImport';
import StoriesImport from './StorySection/StoriesImport';
import PostImport from './PostSection/PostImport';

import classes from '../../assets/scss/modules/adminConsole.module.scss';

// import actions
import { deleteStory } from '../../actions/story';
import { deletePost } from '../../actions/post';
import { setAlert } from '../../actions/alert';

// probably a better way, but this is what i've got for now
import accordionInnerClasses from '../../assets/scss/modules/accordionInner.module.scss';

// MODAL CODE
Modal.setAppElement('#root');
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.7)';
const customStyles = {
  top                   : '50%',
  left                  : '50%',
  right                 : 'auto',
  bottom                : 'auto',
  marginRight           : '-50%',
  transform             : 'translate(-50%, -50%)'
}
// MODAL CODE

const AdminConsole = ({ deleteStory, deletePost, setAlert, auth: { user }, adminUser }) => {

  const [selected, setSelected] = useState(false);
  const [info, setInfo] = useState();

  const getElem = (e) => {
    // get element from accordion, which is the child of the child element here
    e.preventDefault();
    const elem = e.currentTarget;
    const elemType = elem.parentNode.parentNode.id;
    const elemId = elem.id;
    const elemParent = elem.dataset.parent || null;
    console.log(elemParent);
    const elemClasses = document.querySelectorAll(`.${accordionInnerClasses.selected}`)

    // getting the info from the g-child
    if (elem.classList.contains(accordionInnerClasses.selected)) {
      elem.classList.remove(accordionInnerClasses.selected);
      setSelected(false);
      setInfo('');
    } else {
      elemClasses.forEach(el => {
        el.classList.remove(accordionInnerClasses.selected);
      })
      elem.classList.toggle(accordionInnerClasses.selected);

      // Currently do not want to delete users
      if (elemType !== 'Users') {
        setSelected(true);

        // if it's a post item, we will have a elemParent value
        // if not, we won't. that value, though, will dictate whether it's a
        // story or a post... So the delete action will obviously be different.
        if (elemParent !== null) {
          const info = getContent(elemType, elemId, elemParent);
          setInfo(info);
        } else {
          const info = getContent(elemType, elemId);
          setInfo(info);
        }
      }
    }

  }

  const getContent = (...args) => {
    return args
  }

  const del = (e) => {
    const id = info[1];
    const postParent = info[2];
    console.log(info)

    if (info.length === 2) {
      deleteStory(id);
    }

    if (info.length === 3) {
      deletePost(postParent, id);
    }
  }
  const edit = (e) => {
    console.log(e);
  }

  // MODAL CODE
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }
  const afterOpenModal = () => {
    subtitle.style.color = '#f00';
  }

  const closeModal = () => {
    setIsOpen(false);
  }
  // MODAL CODE


  return (
    <>
      <h2 className="h1">{adminUser.name}&#39;s Admin Console</h2>

      <UsersImport getElement={getElem} />
      <StoriesImport getElement={getElem} />
      <PostImport getElement={getElem} />

      <section className={classes.adminButtons}>
        <article className={classes.buttons}>
          {
            selected !== false ? (
              <>
                <button className="btn btn-danger" onClick={del}>Delete</button>
                <button className="btn btn-light" onClick={edit}>Edit</button>
              </>
            ) : ''
          }
          <button className="btn btn-dark-alt" onClick={openModal}>Add</button>
        </article>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </>
  )
}

AdminConsole.propTypes = {
  deleteStory: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteStory, deletePost, setAlert })(AdminConsole);