import React from 'react';
import styles from './styles/topHeader.module.scss';
import IICLOGO from '../../assets/iiclogo.png';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Search from '../../component/SearchComponent/search';

const TopHeader = () => {
  return (
    <div className={styles.topHeader}>
      <Link to="/" className={styles.topHeaderLeft}>
        <img src={IICLOGO} alt="IIC Logo" />
      </Link>
      <div className={styles.topHeaderRight}>
        <div className={styles.topHeaderRightItem}>
          <Search />
        </div>
        <div className={styles.topHeaderRightItem}>
          <Link to="/login">Login</Link>
        </div>
        <div className={styles.topHeaderRightItem}>
          <Link to="/contact">Contact Us</Link>   
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
