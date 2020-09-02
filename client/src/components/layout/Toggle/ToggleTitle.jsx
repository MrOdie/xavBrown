import React from 'react';

const ToggleTitle = (props) => {
    return (
        <li
            className={props.styles}
            data-id={props.dataId}
        >{props.title}</li>
    )
}

export default ToggleTitle;