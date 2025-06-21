import React from 'react';
import TeamCard from '../../component/TeamCard/Card';
import WinnerData from '../../../public/data/IdeathonWinners.json';
import styles from './styles/Ideathon.module.scss';
// import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const IdeathonEvent = () => {
  return (
    <div className={styles.eventPage}>
      <h2 className={styles.title}>
        <div>
          IIC NIT Durgapur <span className={styles.highlightedText}>Ideathon</span>
        </div>
        <div className={styles.bottomLine}></div>
      </h2>

      <p className={styles.description}>
        The Ideathon is a dynamic event designed to ignite innovation and creative thinking among students. Participants collaborate, brainstorm, and pitch real-world solutions in front of industry mentors and judges.
      </p>

      <div className={styles.buttonWrapper}>
        <HashLink smooth to='/#activity'>
          <button className={styles.applyButton}>Apply Now</button>
        </HashLink>
      </div>

      <h3 className={styles.subTitle}>Meet the Winners</h3>

      <div className={styles.teamContainer}>
        {WinnerData.map((item, index) => (
          <TeamCard key={index} member={item} />
        ))}
      </div>
    </div>
  );
};

export default IdeathonEvent;
