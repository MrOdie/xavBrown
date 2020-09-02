import React from "react";
// import { accordion } from "../../assets/js/accordion";
//import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const AccordionComponent = ({ labels }) => {
    return (
        <div className="accordion__component">
            {console.log(labels)}
            {
                labels.map(label => (
                    <p>{label.role}</p>
                ))
            }
            {/* {
                labels.map((el, ind) => {
                    return (
                        <div key={`accordion_content_${ind}`}>
                            <button className="accordion">
                                {el}
                                <FontAwesomeIcon className="accordion__plus" icon={faPlus} />
                            </button>
                            <div className="panel">
                                {el}
                            </div>
                        </div>
                    );
                })
            } */}
        </div>
    );
}

export default AccordionComponent;
