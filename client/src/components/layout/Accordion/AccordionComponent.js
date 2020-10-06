import React from "react";
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import classes from "../../../assets/scss/modules/accordionComponent.module.scss";

import accordionInnerClasses from '../../../assets/scss/modules/accordionInner.module.scss';

const AccordionComponent = ({ comp, content, getElem }) => {

    const getStories = (cont) => {

        let len = cont.length;
        let updatedContArray = [];
        let returnArray = [];
        let titles = [];
        let duplicates = [];
        let contArrDups = [];
        let halfwayThrough = [];
        let tempArrayFirstHalf = [];

        for (let i = 0; i < len; i++) {
            // Check for duplicates so as to indicate which titles were updated
            if (titles.includes(cont[i].title)) {
                duplicates.push(cont[i].title);
            }
            titles.push(cont[i].title);
        }

        if (duplicates) {
            for (let i = 0; i < len; i++) {
                if (!duplicates.includes(cont[i].title)) {
                    updatedContArray.push(cont[i])
                } else {
                    contArrDups.push(cont[i]);
                }
            }

            if (contArrDups.length > 0) {
                // here we're taking the duplicates and we're only taking the first half of them BC when an item is edited, then it creates a duplicate, but the new items are always at the front of the array.
                halfwayThrough = Math.floor(contArrDups.length / 2);
                tempArrayFirstHalf = contArrDups.slice(0, halfwayThrough);

                for (let i = 0; i < tempArrayFirstHalf.length; i++) {
                    updatedContArray.unshift(tempArrayFirstHalf[i])
                }
            }
            returnArray = updatedContArray;
        } else {
            returnArray = cont;
        }

        return (
            returnArray.map(item => (
                <div key={item._id} className={accordionInnerClasses.StoriesRow} id={item._id} onClick={(e) => getElem(e, item.title)}>
                    <div className={accordionInnerClasses.Inner}>
                        <p>{item.title} {item.__v}</p>
                        <p>{item.isPublished === true ? 'Published' : 'Draft'}</p>
                    </div>
                </div>
            ))
        )
    }

    const accordionHeight = (arg) => {
        // Gets the inner portion of the accordion in order to set max-height;
        const accordionInner = arg.childNodes[0];
        const heightConstraint = 350;

        if (accordionInner.scrollHeight > heightConstraint) {
            accordionInner.style.maxHeight = heightConstraint + "px";
        } else {
            accordionInner.style.overflowY = 'auto';
        }

        if (arg.style.maxHeight) {
            arg.style.maxHeight = null;
        } else {
            arg.style.maxHeight = arg.scrollHeight + "px";
        }

        return

    };

    const accordion = (e) => {
        const elem = e.currentTarget;
        let pnl = elem.nextElementSibling;

        if (elem.classList.contains(classes.accordion__active)) {
            elem.classList.remove(classes.accordion__active);

            accordionHeight(pnl);
        } else {

            elem.classList.toggle(classes.accordion__active);

            accordionHeight(pnl);
        }

    }

    return (
        <section className={classes.accordion__component}>
            {
                comp === 'Users' ? (
                    <>
                        <button className={`${classes.accordion} ${comp}`} onClick={accordion}>
                            {comp}
                            <FontAwesomeIcon className={classes.accordion__plus} icon={faPlus} />
                        </button>
                        <article className={classes.panel} id={comp}>
                            <div className={accordionInnerClasses.Users}>
                                <div className={accordionInnerClasses.UsersTitleRow}>
                                    <div className={accordionInnerClasses.TitleRowInner}>
                                        <p><strong>Name</strong></p>
                                        <p><strong>UserName</strong></p>
                                        <p><strong>Role</strong></p>
                                    </div>
                                </div>
                                {
                                    content.map(item => (
                                        <div key={`${item._id} ${item.updatedAt}`} className={accordionInnerClasses.UsersRow} id={item._id} onClick={getElem}>
                                            <div className={accordionInnerClasses.Inner}>
                                                <p>{item.name}</p>
                                                <p>{item.userName}</p>
                                                <p>{item.role}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </article>
                    </>
                ) : (
                        comp === 'Stories' ? (
                            <>
                                <button className={`${classes.accordion} ${comp}`} onClick={accordion}>
                                    {comp}
                                    <FontAwesomeIcon className={classes.accordion__plus} icon={faPlus} />
                                </button>
                                <article className={classes.panel} id={comp}>
                                    <div className={accordionInnerClasses.Stories}>
                                        <div className={accordionInnerClasses.StoriesTitleRow}>
                                            <div className={accordionInnerClasses.TitleRowInner}>
                                                <p><strong>Story</strong></p>
                                                <p><strong>Status</strong></p>
                                            </div>
                                        </div>
                                        {getStories(content)}
                                    </div>
                                </article>
                            </>
                        ) : (
                                comp === 'Posts' ? (
                                    <>
                                        <button className={`${classes.accordion} ${comp}`} onClick={accordion}>
                                            {comp}
                                            <FontAwesomeIcon className={classes.accordion__plus} icon={faPlus} />
                                        </button>
                                        <article className={classes.panel} id={comp}>
                                            <div className={accordionInnerClasses.Posts}>
                                                <div className={accordionInnerClasses.PostsTitleRow}>
                                                    <div className={accordionInnerClasses.TitleRowInner}>
                                                        <p><strong>Story</strong></p>
                                                        <p><strong>Title</strong></p>
                                                        <p><strong>Status</strong></p>
                                                        <p><strong>Remarks</strong></p>
                                                    </div>
                                                </div>
                                                {
                                                    content.map(item => (
                                                        <div key={`${item._id} ${item.updatedAt}`} className={accordionInnerClasses.PostsRow} id={item._id} data-parent={item.storyId} onClick={(e) => getElem(e, item.title)}>
                                                            <div className={accordionInnerClasses.Inner}>
                                                                <p>{item.storyTitle}</p>
                                                                <p>{item.title}</p>
                                                                <p>{item.isPublished === true ? 'Published' : 'Draft'}</p>
                                                                <p className="comment">{item.comments.length}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </article>
                                    </>
                                ) : ''
                            )
                    )
            }
        </section>
    );
}

AccordionComponent.propTypes = {
    comp: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired,
    getElem: PropTypes.func.isRequired
}
export default AccordionComponent;
