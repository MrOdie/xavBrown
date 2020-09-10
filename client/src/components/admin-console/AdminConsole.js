import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import UsersImport from './UserSection/UsersImport';
import StoriesImport from './StorySection/StoriesImport';
import PostImport from './PostSection/PostImport';
import AddNewStory from './AddNew/AddNewStory';
import AddNewPost from './AddNew/AddNewPost';
import EditStory from './Edit/EditStory';
import EditPost from './Edit/EditPost';

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
  content: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    padding: '30px',
    inset: '0',
    gridColumn: '2/3'
  },
  overlay: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr',
    justifyItems: 'stretch',
    alignContent: 'center',
  }
};

// MODAL CODE

const AdminConsole = ({ deleteStory, deletePost, setAlert, auth: { user }, adminUser }) => {

  const [selected, setSelected] = useState(false);
  const [info, setInfo] = useState('');
  const [storyName, setStoryName] = useState('');
  const [story, setStory] = useState('');
  const [elementType, setElementType] = useState();

  const getElem = (e, arg) => {
    // get element from accordion, which is the child of the child element here
    e.preventDefault();
    const elem = e.currentTarget;
    const elemType = elem.parentNode.parentNode.id;
    const elemId = elem.id;
    const elemParent = elem.dataset.parent || null;
    const elemClasses = document.querySelectorAll(`.${accordionInnerClasses.selected}`)

    setElementType(elemType);
    setSelected(false);
    setInfo('');
    setStory('');

    // getting the info from the g-child
    if (elem.classList.contains(accordionInnerClasses.selected)) {
      elem.classList.remove(accordionInnerClasses.selected);
    } else {
      elemClasses.forEach(el => {
        el.classList.remove(accordionInnerClasses.selected);
      })
      elem.classList.toggle(accordionInnerClasses.selected);

      // Currently do not want to delete users
      if (elemType !== 'Users') {

        // if it's a post item, we will have a elemParent value
        // if not, we won't. that value, though, will dictate whether it's a
        // storyName or a post... So the delete action will obviously be different.
        if (elemParent !== null) {
          const info = getContent(elemType, elemId, elemParent);
          setInfo(info);
        } else {
          const info = getContent(elemType, elemId);

          setSelected(true);
          setStoryName(arg);
          setStory(elem.id);
          setInfo(info);
        }
      }
    }

  }

  console.log(elementType);
  const getContent = (...args) => {
    return args
  }

  const del = (e) => {
    const id = info[1];
    const postParent = info[2];

    if (info.length === 2) {
      deleteStory(id);
    }

    if (info.length === 3) {
      deletePost(postParent, id);
    }

    setSelected(false);
    setStory('');
    setStoryName('');
    setInfo('');
  }
  // const edit = (e) => {
  //   console.log(e);
  // }

  // MODAL CODE
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (e) => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    setStory('');
    setStoryName('');
    setInfo('');
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
            info.length >= 2 ? (
              <>
                <button id="delete" className="btn btn-danger" onClick={del}>Delete</button>
                <button id="edit" className="btn btn-light" onClick={openModal}>Edit</button>
              </>
            ) : ''
          }
          {
            selected === false || info.length === 2 ? (
              <button id="create" className="btn btn-dark-alt" onClick={openModal}>
                {
                  info.length == 2 ? (`Create a Post`) : (`Create a Story`)
                }
              </button>
            ) : ''
          }
           {/* <button id="create" className="btn btn-dark-alt" onClick={openModal}>
             {
               selected === false || info[0] !== 'Stories' ? (`Create a Story`) : (`Create a Post`)
             }
           </button> */}
        </article>
      </section>

      <Modal
        portalClassName={classes.Modal}
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeModal}
        contentLabel="Example Modal">
        <button className={`btn btn-danger ${classes.closeBtn}`} onClick={closeModal}>X</button>
        <h3>Create {selected === false ? (`Your Next Story`) : (`Your Next Post`)}</h3>
        {
          storyName !== '' ? (<h4>{storyName}</h4>) : ''
        }
        {
          (selected === false) ? (
            <>
              <EditStory />
              <AddNewStory closeModal={closeModal} /></>
          ) : (
              <>
                <EditPost />
                <AddNewPost closeModal={closeModal} story={story} /></>
            )
        }
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