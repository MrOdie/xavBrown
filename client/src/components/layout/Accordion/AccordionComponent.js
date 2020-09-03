import React, { useRef } from "react";
// import { accordion } from "../../assets/js/accordion";
//import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import classes from "../../../assets/scss/modules/accordionComponent.module.scss";
import userClasses from '../../../assets/scss/modules/user.module.scss';


const AccordionComponent = ({ title, comp, content }) => {

    const button = useRef(null);
    const panel = useRef(null);

    const accordionHeight = (arg) => {
        console.log('here');
        // Gets the inner portion of the accordion in order to set max-height;
        const accordionInner = arg.childNodes[0];
        const heightConstraint = 350;

        if (accordionInner.scrollHeight > heightConstraint){
            accordionInner.style.maxHeight = heightConstraint + "px";
        } else {
            accordionInner.style.overflowY = 'auto';
        }

        console.log(accordionInner.scrollHeight);

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
            <button className={classes.accordion} onClick={accordion} ref={button}>
                {title}
                <FontAwesomeIcon className={classes.accordion__plus} icon={faPlus} />
            </button>
            <article className={classes.panel} ref={panel}>
                <div className={userClasses.user}>
                    <div className={userClasses.titleRow}>
                        <p><strong>Name</strong></p>
                        <p><strong>UserName</strong></p>
                        <p><strong>Role</strong></p>
                    </div>

                    {
                        content.map(item => (
                            <div key={item._id} className={userClasses.row}>
                                <p>{item.name}</p>
                                <p>{item.userName}</p>
                                <p>{item.role}</p>
                            </div>
                        ))
                    }
                </div>
            </article>
        </section>
    );
}
export default AccordionComponent;
