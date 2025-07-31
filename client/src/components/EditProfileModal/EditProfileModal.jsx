import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { updateUser } from '../../store/slices/authSlice';
import apiService from '../../services/apiService';
import azureBlobService from '../../services/azureBlobService';
import styles from './styles/editProfileModal.module.scss';
import GradientText from '../../component/Core/TextStyle';

// Set app element for accessibility
Modal.setAppElement('#root');

const EditProfileModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    photo: ''
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        photo: user.photo || ''
      });
      setPreviewUrl(user.photo || null);
    }
  }, [isOpen, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError('');
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async () => {
    if (!selectedFile) return formData.photo;

    setIsUploading(true);
    try {
      const fileName = `profile-${user._id || user.id}-${Date.now()}.${selectedFile.name.split('.').pop()}`;
      const uploadResult = await azureBlobService.uploadFile(selectedFile, fileName);
      
      if (uploadResult.success) {
        // Show message if using fallback method
        if (uploadResult.message && uploadResult.message.includes('fallback')) {
          console.info('Using fallback upload method. Configure Azure Blob Storage for cloud storage.');
        }
        return uploadResult.url;
      } else {
        throw new Error(uploadResult.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Photo upload failed:', error);
      setError('Photo upload failed. Please try again.');
      return formData.photo; // Keep existing photo on upload failure
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Upload photo if a new one is selected
      const photoUrl = await uploadPhoto();
      
      const updatedData = {
        ...formData,
        photo: photoUrl
      };

      // Update profile via API
      const response = await apiService.updateProfile(updatedData);
      
      if (response.success) {
        // Update Redux state
        dispatch(updateUser(response.data.user));
        onClose();
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (error) {
      setError(error.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      photo: ''
    });
    setSelectedFile(null);
    setPreviewUrl(null);
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      contentLabel="Edit Profile"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2><GradientText text="Edit Profile" /></h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Profile Photo Section */}
          <div className={styles.photoSection}>
            <div className={styles.photoPreview}>
              <img 
                src={previewUrl || 'https://via.placeholder.com/120'} 
                alt="Profile preview"
                className={styles.previewImage}
              />
              {isUploading && (
                <div className={styles.uploadingOverlay}>
                  <div className={styles.spinner}></div>
                </div>
              )}
            </div>
            <div className={styles.photoControls}>
              <label htmlFor="photo-upload" className={styles.uploadButton}>
                Choose Photo
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className={styles.hiddenInput}
              />
              <p className={styles.photoHint}>Max size: 5MB</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                rows={3}
              />
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
              disabled={isSubmitting || isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
