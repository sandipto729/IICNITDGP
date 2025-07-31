# Environment Setup Guide

This document explains all the environment variables needed to run the IIC NIT Durgapur application.

## Server Environment Variables (.env)

Create a `.env` file in the `/server` directory with the following variables:

### Required Variables

#### Database Configuration
```bash
MONGO_URI=mongodb://localhost:27017/iic-nitdgp
```
- **Local MongoDB**: Use `mongodb://localhost:27017/iic-nitdgp`
- **MongoDB Atlas**: Use `mongodb+srv://<username>:<password>@cluster.mongodb.net/iic-nitdgp`

#### JWT Configuration
```bash
JWT_ACCESS_SECRET=your-super-secret-access-token-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-this-in-production
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```
- **JWT_ACCESS_SECRET**: Secret key for access tokens (minimum 32 characters)
- **JWT_REFRESH_SECRET**: Secret key for refresh tokens (different from access secret)
- **JWT_ACCESS_EXPIRES_IN**: Access token expiration time (15 minutes recommended)
- **JWT_REFRESH_EXPIRES_IN**: Refresh token expiration time (7 days recommended)

#### Server Configuration
```bash
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```
- **PORT**: Server port (default: 8000)
- **NODE_ENV**: Environment mode (`development`, `production`, `test`)
- **FRONTEND_URL**: Frontend URL for CORS configuration

## Client Environment Variables (.env)

Create a `.env` file in the `/client` directory with the following variables:

### Required Variables

#### API Configuration
```bash
VITE_API_BASE_URL=http://localhost:8000/api
```
- **VITE_API_BASE_URL**: Backend API base URL

#### Azure Blob Storage Configuration
```bash
VITE_AZURE_STORAGE_ACCOUNT_NAME=your-storage-account-name
VITE_AZURE_STORAGE_ACCOUNT_KEY=your-storage-account-key
VITE_AZURE_STORAGE_CONTAINER_NAME=your-container-name
```
- **VITE_AZURE_STORAGE_ACCOUNT_NAME**: Azure Storage account name
- **VITE_AZURE_STORAGE_ACCOUNT_KEY**: Azure Storage account access key
- **VITE_AZURE_STORAGE_CONTAINER_NAME**: Container name for file uploads (e.g., "uploads")

### Optional Variables
```bash
VITE_APP_NAME=IIC NIT Durgapur
VITE_APP_VERSION=1.0.0
```

## Azure Blob Storage Setup

To enable file uploads for events/profile photos:

1. **Create Azure Storage Account**:
   - Go to Azure Portal
   - Create a new Storage Account
   - Choose "StorageV2 (general purpose v2)"
   - Set access tier to "Hot"

2. **Create Container**:
   - Navigate to your storage account
   - Go to "Containers" section
   - Create a new container (e.g., "uploads")
   - Set public access level to "Blob" (for public read access)

3. **Get Credentials**:
   - Go to "Access keys" section
   - Copy the storage account name and key1
   - Update your client `.env` file with these values

4. **CORS Configuration** (if needed):
   - Go to "Resource sharing (CORS)" section
   - Add allowed origins, methods, and headers for your frontend domain

## MongoDB Setup

### Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/iic-nitdgp`

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com
2. Create a new cluster
3. Create database user with read/write access
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string from "Connect" button
6. Replace `<username>` and `<password>` with your credentials

## Security Notes

- **Never commit .env files to version control**
- **Use strong, random secrets for JWT keys**
- **Change default secrets in production**
- **Use environment-specific configurations**
- **Regularly rotate API keys and secrets**

## Development Setup

1. **Server**:
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your values
   npm start
   ```

2. **Client**:
   ```bash
   cd client
   npm install
   cp .env.example .env
   # Edit .env with your values
   npm run dev
   ```

## Production Deployment

For production deployment, ensure:
- Set `NODE_ENV=production`
- Use production database URLs
- Use strong JWT secrets
- Configure proper CORS settings
- Set up proper logging
- Use HTTPS for all endpoints
- Secure Azure Blob Storage access

## Troubleshooting

### Common Issues:
1. **MongoDB Connection Failed**: Check connection string and network access
2. **JWT Token Invalid**: Verify JWT secrets are correctly set
3. **File Upload Failed**: Check Azure Blob Storage credentials and CORS settings
4. **CORS Errors**: Verify FRONTEND_URL matches your client URL
5. **Port Already in Use**: Change PORT in server .env file
