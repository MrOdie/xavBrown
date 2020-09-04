import React, { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import classes from "../../../assets/scss/modules/accordionComponent.module.scss";

import Posts from "../../post/Posts";
import accordionInnerClasses from '../../../assets/scss/modules/accordionInner.module.scss';


const AccordionComponent = ({ title, comp, content }) => {

    const button = useRef(null);
    const panel = useRef(null);

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
        const elem = e.target;
        let pnl = elem.nextElementSibling;
        let elemClass = "." + elem.classList[0];
        let elemClasses = document.querySelectorAll(elemClass);

        if (elem.classList.contains(classes.accordion__active)) {
            elem.classList.remove(classes.accordion__active);

            accordionHeight(pnl);
        } else {
            elemClasses.forEach((elie) => {
                elie.classList.remove(classes.accordion__active);
                elie.nextSibling.style.maxHeight = null;
            });

            elem.classList.toggle(classes.accordion__active);

            accordionHeight(pnl);
        }
    }
    return (

        <section className={classes.accordion__component}>
            {
                comp === 'Users' ? (
                    <>
                        <button className={`${classes.accordion} ${comp}`} onClick={accordion} ref={button}>
                            {comp}
                            <FontAwesomeIcon className={classes.accordion__plus} icon={faPlus} />
                        </button>
                        <article className={classes.panel} ref={panel}>
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
                                        <div key={item._id} className={accordionInnerClasses.UsersRow}>
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
                                <button className={`${classes.accordion} ${comp}`} onClick={accordion} ref={button}>
                                    {comp}
                                    <FontAwesomeIcon className={classes.accordion__plus} icon={faPlus} />
                                </button>
                                <article className={classes.panel} ref={panel}>
                                    <div className={accordionInnerClasses.Stories}>
                                        <div className={accordionInnerClasses.StoriesTitleRow}>
                                            <p><strong>Story</strong></p>
                                        </div>
                                        {
                                            content.map(item => (
                                                <div key={item._id} className={accordionInnerClasses.StoriesRow}>
                                                    <p>{item.title}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </article>
                            </>
                        ) : (
                                comp === 'Posts' ? (
                                    <>
                                        <button className={`${classes.accordion} ${comp}`} onClick={accordion} ref={button}>
                                            {comp}
                                            <FontAwesomeIcon className={classes.accordion__plus} icon={faPlus} />
                                        </button>
                                        <article className={classes.panel} ref={panel}>
                                            <div className={accordionInnerClasses.Posts}>
                                                <div className={accordionInnerClasses.PostsTitleRow}>
                                                    <p><strong>Story</strong></p>
                                                    <p><strong>Title</strong></p>
                                                </div>
                                                {
                                                    content.map(item => (
                                                        <div key={item._id} className={accordionInnerClasses.PostsRow}>
                                                            <p>{item.storyTitle}</p>
                                                            <p>{item.title}</p>
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
export default AccordionComponent;
