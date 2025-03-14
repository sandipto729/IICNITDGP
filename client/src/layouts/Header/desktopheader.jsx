import React, { useState } from 'react';
import styles from './styles/desktopheader.module.scss';
import { Link } from 'react-router-dom';
import NITDGPLOGO from '../../assets/NITLogo.jpeg';

const DesktopHeader = () => {
    const [isDown, setIsDown] = useState(false);

    return (
        <div className={styles.desktopHeaderContainer}>
            <ul>
                <a href='https://nitdgp.ac.in/'><img src={NITDGPLOGO} alt="Nit DGP Logo" /></a>
            </ul>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li
                    className={styles.dropdown}
                    onMouseEnter={() => setIsDown(true)}
                    onMouseLeave={() => setIsDown(false)}
                >
                    About
                    {isDown && (
                        <div className={styles.dropdownContent}>
                            <Link to="/about">About Us</Link>
                            <Link to="/team">Team</Link>
                            <Link to="/facilities">Facilities</Link>
                            <Link to="/faq">FAQ</Link>
                        </div>
                    )}
                </li>
                <li>
                    <Link to="/program">Program</Link>
                </li>
                <li>
                    <Link to="/guidelines">Guidelines</Link>
                </li>
                <li>
                    <Link to="/event">Events</Link>
                </li>
                <li>
                    <Link to="/thinkinglab">Thinking Lab</Link>
                </li>
                <li>
                    <Link to="/asokesen">AsokeSen</Link>
                </li>
            </ul>
        </div>
    );
};

export default DesktopHeader;
