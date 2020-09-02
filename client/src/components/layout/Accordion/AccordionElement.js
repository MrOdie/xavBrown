import React from 'react';

const accordionElement = (props) => {
  return (
    <>
      <button className="accordion">Section 1</button>
      <div className="panel">
        <p>First</p>
      </div>
    </>
  )
}

export default accordionElement;