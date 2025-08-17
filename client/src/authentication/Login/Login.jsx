import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import apiService from '../../services/apiService';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import styles from './styles/Login.module.scss';
import GradientText from '../../component/Core/TextStyle';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  // Redirect to profile if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await apiService.login(formData);
      
      if (response.success) {
        dispatch(loginSuccess({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        }));
        navigate('/profile');
      } else {
        dispatch(loginFailure(response.message || 'Login failed'));
      }
    } catch (error) {
      dispatch(loginFailure(error.message || 'Network error. Please try again.'));
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h2><GradientText text="Welcome Back" /></h2>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className={styles.forgotPasswordContainer}>
            <button
              type="button"
              className={styles.forgotPasswordLink}
              onClick={() => setIsResetPasswordOpen(true)}
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.loginFooter}>
          <p>Don't have an account? Contact admin for registration.</p>
        </div>
      </div>

      {/* Reset Password Modal */}
      <ResetPassword 
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
      />
    </div>
  );
};

export default Login;
