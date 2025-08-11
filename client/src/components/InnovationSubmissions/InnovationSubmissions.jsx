import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import apiService from '../../services/apiService';
import styles from './styles/innovationSubmissions.module.scss';
import GradientText from '../../component/Core/TextStyle';

Modal.setAppElement('#root');

const InnovationSubmissions = ({ isOpen, onClose }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) fetchSubmissions();
  }, [isOpen]);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError('');
    try {
      // Adjust the endpoint as per your backend route
      const response = await apiService.request('/admin/innovations');
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.innovations || []);
      } else {
        setError(data.message || 'Failed to fetch submissions');
      }
    } catch (err) {
      setError('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmissions([]);
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      contentLabel="Innovation Submissions"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2><GradientText text="Innovation Submissions" /></h2>
          <button className={styles.closeButton} onClick={handleClose} type="button">×</button>
        </div>
        {loading ? (
          <div className={styles.loadingContainer}><p>Loading submissions...</p></div>
        ) : error ? (
          <div className={styles.errorMessage}>{error}</div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.submissionsTable}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Theme</th>
                  <th>Summary</th>
                  <th>Team Leader Name</th>
                  <th>Team Leader Email</th>
                  <th>Team Leader Phone</th>
                  <th>Team Leader Roll</th>
                  <th>Team Members</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length === 0 ? (
                  <tr><td colSpan={10}>No submissions found</td></tr>
                ) : submissions.map(sub => (
                  <tr key={sub._id}>
                    <td>{sub.title}</td>
                    <td>{sub.innovationType}</td>
                    <td>{sub.themes}</td>
                    <td>{sub.summary}</td>
                    <td>{sub.teamLeaderName}</td>
                    <td>{sub.teamLeaderEmail}</td>
                    <td>{sub.teamLeaderPhone}</td>
                    <td>{sub.teamLeaderRoll}</td>
                    <td>{sub.teamMembers}</td>
                    <td>{sub.createdAt ? new Date(sub.createdAt).toLocaleString() : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className={styles.modalFooter}>
          <button onClick={handleClose} className={styles.closeModalButton}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default InnovationSubmissions;
