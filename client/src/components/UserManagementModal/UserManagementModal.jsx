import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import apiService from '../../services/apiService';
import styles from './styles/userManagementModal.module.scss';
import GradientText from '../../component/Core/TextStyle';

// Set app element for accessibility
Modal.setAppElement('#root');

const UserManagementModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0
  });

  // Fetch users when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen, searchTerm, roleFilter, pagination.currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });

      if (searchTerm) params.append('search', searchTerm);
      if (roleFilter !== 'all') params.append('role', roleFilter);

      const response = await apiService.request(`/admin/users-management?${params}`);
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
        setPagination(data.pagination);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Fetch users error:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({
      ...user,
      originalEmail: user.email // Keep track of original email
    });
    setError('');
    setSuccess('');
  };

  const handleSaveUser = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await apiService.request(`/admin/users-management/${editingUser._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: editingUser.name,
          email: editingUser.email,
          phone: editingUser.phone,
          role: editingUser.role,
          isActive: editingUser.isActive
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('User updated successfully');
        setEditingUser(null);
        fetchUsers(); // Refresh the list
      } else {
        setError(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Update user error:', error);
      setError('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (field, value) => {
    setEditingUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const handleClose = () => {
    setUsers([]);
    setEditingUser(null);
    setSearchTerm('');
    setRoleFilter('all');
    setError('');
    setSuccess('');
    setPagination({ currentPage: 1, totalPages: 1, totalUsers: 0 });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      contentLabel="User Management"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2><GradientText text="User Management" /></h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
          >
            ×
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterContainer}>
            <select
              value={roleFilter}
              onChange={handleRoleFilterChange}
              className={styles.roleFilter}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {/* Messages */}
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        {/* Users Table */}
        <div className={styles.tableContainer}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <p>Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className={styles.noUsers}>
              <p>No users found</p>
            </div>
          ) : (
            <table className={styles.usersTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>
                      {editingUser && editingUser._id === user._id ? (
                        <input
                          type="text"
                          value={editingUser.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={styles.editInput}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>
                      {editingUser && editingUser._id === user._id ? (
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={styles.editInput}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingUser && editingUser._id === user._id ? (
                        <input
                          type="tel"
                          value={editingUser.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={styles.editInput}
                          placeholder="Phone number"
                        />
                      ) : (
                        user.phone || 'Not provided'
                      )}
                    </td>
                    <td>
                      {editingUser && editingUser._id === user._id ? (
                        <select
                          value={editingUser.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className={styles.editSelect}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span className={user.role === 'admin' ? styles.adminRole : styles.userRole}>
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td>
                      {editingUser && editingUser._id === user._id ? (
                        <select
                          value={editingUser.isActive}
                          onChange={(e) => handleInputChange('isActive', e.target.value === 'true')}
                          className={styles.editSelect}
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      ) : (
                        <span className={user.isActive ? styles.statusActive : styles.statusInactive}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      )}
                    </td>
                    <td>
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    <td>
                      {editingUser && editingUser._id === user._id ? (
                        <div className={styles.editActions}>
                          <button
                            onClick={handleSaveUser}
                            className={styles.saveButton}
                            disabled={loading}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className={styles.cancelButton}
                            disabled={loading}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditUser(user)}
                          className={styles.editButton}
                          disabled={loading}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className={styles.paginationButton}
            >
              Previous
            </button>
            <span className={styles.paginationInfo}>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className={styles.paginationButton}
            >
              Next
            </button>
          </div>
        )}

        <div className={styles.modalFooter}>
          <button
            onClick={handleClose}
            className={styles.closeModalButton}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserManagementModal;
