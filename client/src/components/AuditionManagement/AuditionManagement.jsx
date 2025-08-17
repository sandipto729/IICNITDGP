import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import Api from '../../common/api';
import GradientText from '../../component/Core/TextStyle';
import styles from './styles/auditionManagement.module.scss';

const AuditionManagement = ({ isOpen, onClose }) => {
  const [auditions, setAuditions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState({});
  const { accessToken, isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check authentication on component mount and when modal opens
  useEffect(() => {
    if (isOpen) {
      if (!isAuthenticated || !accessToken || !user) {
        console.log('No valid authentication found, redirecting to login');
        handleAuthError();
        return;
      }
      
      if (user.role !== 'admin') {
        console.log('User is not admin, closing modal');
        onClose();
        alert('Access denied. Admin privileges required.');
        return;
      }
      
      fetchAuditions();
    }
  }, [isOpen, isAuthenticated, accessToken, user]);

  const handleAuthError = () => {
    console.log('Authentication error, logging out and redirecting');
    dispatch(logout());
    onClose();
    navigate('/login');
  };

  const fetchAuditions = async () => {
    setLoading(true);
    setError('');
    
    // Check token before making request
    if (!accessToken) {
      console.log('No access token available');
      handleAuthError();
      return;
    }
    
    try {
      console.log('Fetching auditions from:', Api.AuditionFetch.url);
      console.log('Using token:', accessToken ? `${accessToken.substring(0, 20)}...` : 'No token');
      
      const response = await fetch(Api.AuditionFetch.url, {
        method: Api.AuditionFetch.method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        console.log('Authentication failed, token may be expired');
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Fetched auditions:', data);
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setAuditions(data);
      } else {
        console.error('Expected array but got:', typeof data, data);
        setAuditions([]);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching auditions:', err);
      
      // Check if it's a network error or token issue
      if (err.message.includes('401') || err.message.includes('403')) {
        handleAuthError();
        return;
      }
      
      setError(`Failed to fetch audition candidates: ${err.message}`);
      setAuditions([]); // Reset auditions on error
    } finally {
      setLoading(false);
    }
  };

  const updateAuditionStatus = async (auditionId, status) => {
    setUpdating(prev => ({ ...prev, [auditionId]: true }));
    setError(''); // Clear any existing errors
    
    // Check token before making request
    if (!accessToken) {
      console.log('No access token available for status update');
      handleAuthError();
      return;
    }
    
    try {
      const url = Api.AuditionUpdateStatus.url.replace(':id', auditionId);
      const response = await fetch(url, {
        method: Api.AuditionUpdateStatus.method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        console.log('Authentication failed during status update');
        handleAuthError();
        return;
      }

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update status: ${response.status} ${response.statusText} - ${errorData}`);
      }

      const result = await response.json();
      console.log('Status update result:', result);

      // Show success message based on status
      if (status === 'approved') {
        alert('Candidate approved successfully! Email notification sent.');
      } else if (status === 'rejected') {
        alert('Candidate rejected and removed from list. Email notification sent.');
      }

      // Refresh the auditions list after successful update
      setTimeout(() => {
        fetchAuditions();
      }, 500); // Small delay to ensure backend processing is complete
      
    } catch (err) {
      console.error('Error updating status:', err);
      
      // Check if it's an auth error
      if (err.message.includes('401') || err.message.includes('403')) {
        handleAuthError();
        return;
      }
      
      setError(`Failed to update audition status: ${err.message}`);
      alert(`Error: ${err.message}`);
    } finally {
      setUpdating(prev => ({ ...prev, [auditionId]: false }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved':
        return styles.statusApproved;
      case 'rejected':
        return styles.statusRejected;
      case 'pending':
      default:
        return styles.statusPending;
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2><GradientText text="Audition Candidates Management" /></h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          {/* Show authentication warning */}
          {(!isAuthenticated || !accessToken) && (
            <div className={styles.authError}>
              <p>Authentication required. Redirecting to login...</p>
            </div>
          )}

          {loading && (
            <div className={styles.loading}>
              <p>Loading audition candidates...</p>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <p>{error}</p>
              <button onClick={fetchAuditions} className={styles.retryButton}>
                Retry
              </button>
            </div>
          )}

          {!loading && !error && auditions.length === 0 && (
            <div className={styles.noData}>
              <p>No audition candidates found.</p>
            </div>
          )}

          {!loading && !error && auditions.length > 0 && (
            <div className={styles.auditionsList}>
              <div className={styles.listHeader}>
                <h3>Total Candidates: {auditions.length}</h3>
                <button onClick={fetchAuditions} className={styles.refreshButton}>
                  Refresh
                </button>
              </div>

              <div className={styles.auditionsGrid}>
                {auditions.map((audition) => (
                  <div key={audition._id} className={styles.auditionCard}>
                    <div className={styles.cardHeader}>
                      <h4>{audition.name}</h4>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(audition.status)}`}>
                        {audition.status || 'pending'}
                      </span>
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.infoRow}>
                        <label>Email:</label>
                        <span>{audition.email}</span>
                      </div>
                      
                      <div className={styles.infoRow}>
                        <label>Mobile:</label>
                        <span>{audition.mobile}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <label>Roll No:</label>
                        <span>{audition.rollno}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <label>Year:</label>
                        <span>{audition.year}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <label>Department:</label>
                        <span>{audition.department}</span>
                      </div>

                      <div className={styles.infoRow}>
                        <label>Domains:</label>
                        <div className={styles.domainsContainer}>
                          {audition.domain?.map((domainItem, index) => (
                            <span key={index} className={styles.domainChip}>
                              {domainItem}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.infoRow}>
                        <label>Previous Projects:</label>
                        <div className={styles.descriptionText}>
                          {audition.description || 'No description provided'}
                        </div>
                      </div>

                      <div className={styles.infoRow}>
                        <label>Reason for Joining:</label>
                        <div className={styles.reasonText}>
                          {audition.reason || 'No reason provided'}
                        </div>
                      </div>

                      <div className={styles.infoRow}>
                        <label>Clubs:</label>
                        <div className={styles.otherClubsContainer}>
                          {audition.otherClub && audition.otherClub.length > 0 ? (
                            audition.otherClub.filter(club => club.trim()).map((club, index) => (
                              <span key={index} className={styles.clubChip}>
                                {club}
                              </span>
                            ))
                          ) : (
                            <span className={styles.noClubs}>No other clubs</span>
                          )}
                        </div>
                      </div>

                      {audition.cv && (
                        <div className={styles.infoRow}>
                          <label>CV:</label>
                          <a 
                            href={audition.cv} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.cvLink}
                          >
                            View CV
                          </a>
                        </div>
                      )}

                      {!audition.cv && (
                        <div className={styles.infoRow}>
                          <label>CV:</label>
                          <span className={styles.noCv}>No CV uploaded</span>
                        </div>
                      )}

                      <div className={styles.infoRow}>
                        <label>Applied on:</label>
                        <span>{formatDate(audition.createdAt)}</span>
                      </div>
                    </div>

                    <div className={styles.cardActions}>
                      <button
                        className={styles.approveButton}
                        onClick={() => updateAuditionStatus(audition._id, 'approved')}
                        disabled={updating[audition._id] || audition.status === 'approved' || audition.status === 'rejected'}
                      >
                        {updating[audition._id] ? 'Updating...' : 'Approve'}
                      </button>
                      
                      <button
                        className={styles.rejectButton}
                        onClick={() => updateAuditionStatus(audition._id, 'rejected')}
                        disabled={updating[audition._id] || audition.status === 'rejected' || audition.status === 'approved'}
                      >
                        {updating[audition._id] ? 'Updating...' : 'Reject'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditionManagement;
