const jwt = require('jsonwebtoken');

// Generate Access Token (short-lived)
const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET || 'your-access-token-secret',
    { expiresIn: '15m' } // 15 minutes
  );
};

// Generate Refresh Token (long-lived)
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || 'your-refresh-token-secret',
    { expiresIn: '7d' } // 7 days
  );
};

// Verify Access Token
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'your-access-token-secret');
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

// Verify Refresh Token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your-refresh-token-secret');
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

// Generate both tokens
const generateTokens = (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  
  return { accessToken, refreshToken };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokens
};
