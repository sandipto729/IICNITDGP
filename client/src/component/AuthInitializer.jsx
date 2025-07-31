import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from '../store/slices/authSlice';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load authentication data from localStorage when app starts
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
