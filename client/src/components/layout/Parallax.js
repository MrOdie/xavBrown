import React, { useState, useEffect } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

import classes from '../../assets/scss/modules/parallax.module.scss';

const Parallax = ({ imgLarge, imgSmall, children }) => {
  const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(document.documentElement.clientWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  });

  const img = windowWidth >= 950 ? imgLarge : imgSmall;

  return (
    <section className={classes.heading}>
      <div className={classes.overlay} />
      <article className={classes.headingTitle}>
        <div className={classes.headingContent}>
          {children}
        </div>
      </article>
      <ParallaxBanner className={classes.headingImage} layers={[{ image: img, amount: .3 }]} style={{ height: '500px' }} />
    </section>
  )
}

export default Parallax;