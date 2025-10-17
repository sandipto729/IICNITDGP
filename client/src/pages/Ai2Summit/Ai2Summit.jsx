import React from 'react'
import Overview from '../../section/Ai2Summit/Overview/Overview'
import Objectives from '../../section/Ai2Summit/Objectives/Objectives'
import Schedules from '../../section/Ai2Summit/Schedules/Schedules'
import Commitee from '../../section/Ai2Summit/Commitee/Commitee'
import Sponsor from '../../section/Ai2Summit/Sponsor/Sponsor'
import TechnologicalVerticals from '../../section/Ai2Summit/TechnologicalVerticals/TechnologicalVerticals'
import Sponsorship from '../../section/Ai2Summit/Sponsorship/Sponsorship'
import Registration from '../../section/Ai2Summit/Registration/Registration'
import titleImage from '../../assets/ai2.png'



const Ai2Summit = () => {
  return (
    <div>
      {/* Title Image Section */}
      <section style={{
        padding: '2rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        <img 
          src={titleImage} 
          alt="AI² Summit Title" 
          style={{
            maxWidth: '100%',
            width: '600px',
            height: 'auto',
            borderRadius: '20px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            zIndex: 2,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-10px)';
            e.target.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.7)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5)';
          }}
        />
      </section>
      <Overview />
      <Registration />
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
