import React,{useState} from 'react'
import styles from './styles/mobileheader.module.scss';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const mobileheader = () => {
    const [isDown, setIsDown] = useState(false);
    return (
        <div className={styles.mobilecontainer}>
            <ul>
                {!isDown&&<MenuIcon onClick={()=>{setIsDown(!isDown)}}/>}
                {isDown&&<CloseIcon onClick={()=>{setIsDown(!isDown)}}/>}
            </ul>
            {isDown && <ul onClick={()=>{setIsDown(!isDown)}}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About Us</Link>
                </li>
                <li>
                    <Link to="/team">Team</Link>
                </li>
                <li>
                    <Link to="/facilities">Facilities</Link>
                </li>
                <li>
                    <Link to="/faq">FAQ</Link>
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
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact Us</Link>
                </li>
            </ul>}
        </div>
    )
}

export default mobileheader
