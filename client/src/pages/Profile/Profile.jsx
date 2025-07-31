import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUserFromStorage } from '../../store/slices/authSlice';
import apiService from '../../services/apiService';
import styles from './styles/profile.module.scss';
import GradientText from '../../component/Core/TextStyle';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    // Load user data from localStorage on component mount
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await apiService.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to home
      navigate('/');
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImageContainer}>
            <img 
              src={user.photo || 'https://via.placeholder.com/150'} 
              alt={user.name}
              className={styles.profileImage}
            />
          </div>
          <div className={styles.profileInfo}>
            <h1><GradientText text={user.name} /></h1>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        <div className={styles.profileDetails}>
          <div className={styles.detailSection}>
            <h3><GradientText text="Personal Information" /></h3>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <label>Full Name</label>
                <p>{user.name}</p>
              </div>
              <div className={styles.detailItem}>
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>
              <div className={styles.detailItem}>
                <label>Phone Number</label>
                <p>{user.phone || 'Not provided'}</p>
              </div>
              <div className={styles.detailItem}>
                <label>Address</label>
                <p>{user.address || 'Not provided'}</p>
              </div>
            </div>
          </div>

          <div className={styles.detailSection}>
            <h3><GradientText text="Account Information" /></h3>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <label>User ID</label>
                <p>{user._id || user.id}</p>
              </div>
              <div className={styles.detailItem}>
                <label>Account Status</label>
                <p className={styles.statusActive}>Active</p>
              </div>
              <div className={styles.detailItem}>
                <label>Access Token</label>
                <p className={styles.tokenText}>
                  {accessToken ? `${accessToken.substring(0, 20)}...` : 'Not available'}
                </p>
              </div>
              <div className={styles.detailItem}>
                <label>Refresh Token</label>
                <p className={styles.tokenText}>
                  {refreshToken ? `${refreshToken.substring(0, 20)}...` : 'Not available'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileActions}>
          <button className={styles.editButton}>
            Edit Profile
          </button>
          <button 
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
