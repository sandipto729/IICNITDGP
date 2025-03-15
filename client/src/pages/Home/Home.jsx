

import React from 'react'
import Activity from '../../section/Activity/Activity';
import Check from '../../section/Check/Check';
import FocusArea from './../../section/FocusArea/FocusArea';
import Carousel from './../../component/CarouselComponent/carousel';

const Home = () => {
  return (
    <div>
      {/* <Check /> */}
      <Carousel />
      <Activity />
      <FocusArea />
      {/* <Check /> */}
    </div>
  )
}

export default Home
