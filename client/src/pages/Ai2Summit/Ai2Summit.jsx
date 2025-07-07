import React from 'react'
import Overview from '../../section/Ai2Summit/Overview/Overview'
import Objectives from '../../section/Ai2Summit/Objectives/Objectives'
import Schedules from '../../section/Ai2Summit/Schedules/Schedules'
import Commitee from '../../section/Ai2Summit/Commitee/Commitee'
import Sponsor from '../../section/Ai2Summit/Sponsor/Sponsor'
import TechnologicalVerticals from '../../section/Ai2Summit/TechnologicalVerticals/TechnologicalVerticals'
import Sponsorship from '../../section/Ai2Summit/Sponsorship/Sponsorship'



const Ai2Summit = () => {
  return (
    
    <div>
      <Overview />
      <Objectives />
      <TechnologicalVerticals />
      <Schedules />
      <Commitee />
      <Sponsorship />
      <Sponsor />
    </div>
  )
}

export default Ai2Summit
