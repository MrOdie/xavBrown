import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const ToggleContent = (props) => {
    return (
        <div id={props.id} className={props.styles}>
            {ReactHtmlParser(props.body)}
        </div>
    )
}

export default ToggleContent;