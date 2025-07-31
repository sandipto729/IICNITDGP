# Azure Blob Storage Setup Guide

## Current Status
✅ **Fallback Mode Active**: Photo upload will work using base64 encoding  
⚠️ **Azure Not Configured**: For production, set up Azure Blob Storage

## Quick Setup (5 minutes)

### Step 1: Create Azure Storage Account
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → Search "Storage Account"
3. Fill in:
   - **Subscription**: Your subscription
   - **Resource group**: Create new or use existing
   - **Storage account name**: `iicnitdgpstorage` (or any unique name)
   - **Region**: Choose closest to your users
   - **Performance**: Standard
   - **Redundancy**: LRS (cheapest option)

### Step 2: Get Connection String
1. Go to your Storage Account
2. Click "Access keys" in the left menu
3. Click "Show keys"
4. Copy the **Connection string** from Key1

### Step 3: Create Container
1. In your Storage Account, click "Containers"
2. Click "+ Container"
3. Name: `uploads`
4. Public access level: **Blob** (allows public read access to images)

### Step 4: Configure Environment Variables
Create/update your `.env` file in the `client` folder:

```bash
# Add these lines to client/.env
VITE_AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=iicnitdgpstorage;AccountKey=your-key-here;EndpointSuffix=core.windows.net"
VITE_AZURE_STORAGE_CONTAINER_NAME="uploads"
```

### Step 5: Restart Development Server
```bash
# Stop the current server (Ctrl+C) and restart
npm run dev
```

## Alternative: Use Account Name + Key

Instead of connection string, you can use:
```bash
VITE_AZURE_STORAGE_ACCOUNT_NAME="iicnitdgpstorage"
VITE_AZURE_STORAGE_ACCOUNT_KEY="your-account-key-here"
VITE_AZURE_STORAGE_CONTAINER_NAME="uploads"
```

## Testing
1. Open http://localhost:5174
2. Login with admin credentials
3. Go to Profile page
4. Click "Edit Profile"
5. Upload a photo
6. With Azure configured: Photo uploads to cloud
7. Without Azure: Photo works as base64 (temporary)

## Cost
- Azure Blob Storage: ~$0.018 per GB per month
- For profile photos: Likely under $1/month

## Security Notes
- Never commit `.env` files to git
- Use environment variables in production
- Consider using SAS tokens for enhanced security

---

**Current Fallback**: The app works without Azure setup, but photos are stored as base64 data URLs (not persistent across sessions in production).
