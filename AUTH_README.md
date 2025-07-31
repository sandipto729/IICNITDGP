# Authentication System Documentation

## Overview

This project now includes a complete JWT-based authentication system with access tokens and refresh tokens. The system provides secure user authentication, automatic token refresh, and proper session management.

## Features

### Backend Features
- **JWT Authentication**: Access tokens (15 minutes) and refresh tokens (7 days)
- **Password Security**: Bcrypt hashing for passwords
- **Automatic Token Refresh**: Seamless token renewal without user interaction
- **Secure Routes**: Protected endpoints with middleware authentication
- **User Management**: Registration, login, logout, and profile management
- **Database Integration**: MongoDB with Mongoose for user data persistence

### Frontend Features
- **Redux State Management**: Centralized authentication state
- **Automatic Redirects**: Smart routing based on authentication status
- **Token Management**: Automatic handling of access/refresh tokens
- **Persistent Sessions**: User remains logged in across browser sessions
- **Error Handling**: Comprehensive error handling and user feedback
- **Protected Routes**: Route-level authentication protection

## API Endpoints

### Authentication Routes (`/api/auth/`)

#### Public Routes
- `POST /register` - Register a new user
- `POST /login` - User login
- `POST /refresh-token` - Refresh access token

#### Protected Routes (require authentication)
- `POST /logout` - User logout
- `GET /profile` - Get current user profile
- `PUT /profile` - Update user profile

## Setup Instructions

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Create Test User**
   ```bash
   node createTestUser.js
   ```

4. **Start Server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

## Usage

### Test Login Credentials
- **Email**: test@example.com
- **Password**: password123

### Authentication Flow

1. **Login**: User provides email/password
2. **Token Generation**: Server generates access + refresh tokens
3. **Token Storage**: Tokens stored in Redux + localStorage
4. **API Requests**: Access token automatically added to requests
5. **Token Refresh**: When access token expires, refresh token is used
6. **Logout**: All tokens cleared from client and server

### Frontend Implementation

#### Login Component
```jsx
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import apiService from '../services/apiService';

const handleLogin = async (credentials) => {
  dispatch(loginStart());
  try {
    const response = await apiService.login(credentials);
    if (response.success) {
      dispatch(loginSuccess(response.data));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
```

#### Protected Route
```jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};
```

#### API Service with Auto Token Refresh
```jsx
const response = await apiService.request('/protected-endpoint');
// Automatically handles token refresh if needed
```

## Security Features

### Backend Security
- **Password Hashing**: Bcrypt with salt rounds
- **JWT Secrets**: Separate secrets for access/refresh tokens
- **Token Expiration**: Short-lived access tokens (15 min)
- **CORS Protection**: Configured for frontend domain
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Secure error messages

### Frontend Security
- **Token Storage**: Secure localStorage implementation
- **Automatic Cleanup**: Tokens cleared on logout/expiry
- **Route Protection**: Authentication-based routing
- **Error Boundaries**: Graceful error handling

## File Structure

### Backend Files
```
server/
├── Controller/Auth.js          # Authentication controller
├── middleware/auth.js          # JWT authentication middleware
├── model/User.js              # User database model
├── Routes/auth.js             # Authentication routes
├── utils/jwt.js               # JWT utility functions
├── createTestUser.js          # Test user creation script
└── .env.example               # Environment configuration template
```

### Frontend Files
```
client/src/
├── store/
│   ├── index.js               # Redux store configuration
│   └── slices/authSlice.js    # Authentication state management
├── services/
│   └── apiService.js          # API service with token management
├── components/
│   ├── AuthInitializer.jsx    # Authentication initialization
│   └── ProtectedRoute/        # Route protection component
├── authentication/
│   └── Login/                 # Login page component
└── pages/
    └── Profile/               # User profile page
```

## Token Management

### Access Tokens
- **Purpose**: API request authentication
- **Lifetime**: 15 minutes
- **Storage**: Redux state + localStorage
- **Usage**: Automatic inclusion in API requests

### Refresh Tokens
- **Purpose**: Access token renewal
- **Lifetime**: 7 days
- **Storage**: Redux state + localStorage + database
- **Usage**: Automatic refresh when access token expires

### Token Refresh Flow
1. API request fails with 401 (token expired)
2. ApiService automatically calls refresh endpoint
3. New tokens received and stored
4. Original request retried with new token
5. If refresh fails, user is logged out

## Error Handling

### Backend Errors
- **401 Unauthorized**: Invalid/expired tokens
- **400 Bad Request**: Validation errors
- **404 Not Found**: User not found
- **500 Server Error**: Database/server issues

### Frontend Error Handling
- **Network Errors**: Connection issues
- **Authentication Errors**: Invalid credentials
- **Session Expiry**: Automatic logout
- **Validation Errors**: Form validation feedback

## Development Notes

### Adding New Protected Routes
1. **Backend**: Add middleware to route
   ```javascript
   router.get('/protected', authMiddleware, controller.method);
   ```

2. **Frontend**: Wrap with ProtectedRoute
   ```jsx
   <Route path="/protected" element={
     <ProtectedRoute><Component /></ProtectedRoute>
   } />
   ```

### Customization
- **Token Expiry**: Modify in `utils/jwt.js`
- **User Fields**: Update `model/User.js`
- **Validation**: Modify schema in User model
- **UI Styling**: Update SCSS files in components

## Production Considerations

1. **Environment Variables**: Use strong JWT secrets
2. **HTTPS**: Enable SSL/TLS in production
3. **Database Security**: Use MongoDB authentication
4. **Rate Limiting**: Implement login attempt limits
5. **Monitoring**: Add logging and error tracking
6. **Backup**: Regular database backups

## Troubleshooting

### Common Issues

1. **Token Refresh Loops**: Check token expiry configuration
2. **CORS Errors**: Verify frontend URL in server config
3. **Database Connection**: Ensure MongoDB is running
4. **LocalStorage Issues**: Check browser storage limits

### Debug Tips
- Enable server logs for JWT operations
- Use Redux DevTools for state inspection
- Check Network tab for API request/response
- Verify token contents with JWT debugger
