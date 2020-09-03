import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <section style={{
      gridColumn: '2/3',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      height: '100vh',
      width: 'inherit',
      margin: '0 auto'
    }}>
      <img
        src={spinner}
        style={{ width: '200px', height: '200px', margin: '0 auto', display: 'block' }}
        alt='Loading...'
      />
    </section>
  </Fragment>
);
