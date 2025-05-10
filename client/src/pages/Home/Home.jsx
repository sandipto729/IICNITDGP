import React from 'react'
import Activity from '../../section/Activity/Activity';
import Check from '../../section/Check/Check';
import FocusArea from './../../section/FocusArea/FocusArea';
import About from './../../section/About/About';
import NewsLetter from './../../component/NewsletterComponent/Newsletter';
import Hero from './../../section/Hero/Hero';
import UpcomingEvent from '../../section/UpcomingEvent/UpcomingEvent';
import Testimonial from '../../section/Testimonial/Testimonial';

const Home = () => {
  return (
    <div>
      {/* <Check /> */}
      <Hero />
      <UpcomingEvent />
      <About />
      <Activity />
      <Testimonial />
      {/* <FocusArea /> */}
      <NewsLetter />
      {/* <Check /> */}
    </div>
  )
}

export default Home
