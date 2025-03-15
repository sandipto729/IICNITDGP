

import React from 'react'
import Activity from '../../section/Activity/Activity';
import Check from '../../section/Check/Check';
import FocusArea from './../../section/FocusArea/FocusArea';
import Carousel from './../../component/CarouselComponent/carousel';
import About from './../../section/About/About';
import NewsLetter from './../../component/NewsletterComponent/Newsletter';

const Home = () => {
  return (
    <div>
      {/* <Check /> */}
      <Carousel />
      <About />
      <Activity />
      <FocusArea />
      <NewsLetter />
      {/* <Check /> */}
    </div>
  )
}

export default Home
