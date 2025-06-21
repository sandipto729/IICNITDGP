import React from 'react';
import TeamCard from '../../component/TeamCard/Card';
import InternData from '../../../public/data/Intern.json';
import styles from './styles/Internship.module.scss';

const Internship = () => {
    return (
        <div className={styles.teamPage}>
            <h2 className={styles.teamTitle}>
                <div>
                    Meet Our{' '}
                    <span className={styles.highlightedText}>Interns</span>
                </div>
                <div className={styles.bottomLine}></div>
            </h2>

            <p className={styles.subHeading}>
                The IIC NIT Durgapur chapter supports students in shaping their future
                through impactful internship experiences. These talented interns play a
                vital role in driving innovation and excellence across our initiatives.
            </p>

            <div className={styles.teamContainer}>
                {InternData.map((item, index) => (
                    <TeamCard key={index} member={item} intern={true}/>
                ))}
            </div>
        </div>
    );
};

export default Internship;
