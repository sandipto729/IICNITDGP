// Azure Blob Storage Configuration
// This file contains the configuration for Azure Blob Storage

// Configuration options - you can set these via environment variables or directly here
export const azureConfig = {
  // Get these from your Azure Storage Account
  accountName: import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_NAME || '',
  accountKey: import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_KEY || '',
  containerName: import.meta.env.VITE_AZURE_STORAGE_CONTAINER_NAME || 'uploads',
  
  // Alternative: Connection string (use either this OR accountName/accountKey)
  connectionString: import.meta.env.VITE_AZURE_STORAGE_CONNECTION_STRING || '',
};

// Helper function to check if Azure is configured
export const isAzureConfigured = () => {
  return !!(azureConfig.connectionString || (azureConfig.accountName && azureConfig.accountKey));
};

// Helper function to get connection string
export const getConnectionString = () => {
  if (azureConfig.connectionString) {
    return azureConfig.connectionString;
  }
  
  if (azureConfig.accountName && azureConfig.accountKey) {
    return `DefaultEndpointsProtocol=https;AccountName=${azureConfig.accountName};AccountKey=${azureConfig.accountKey};EndpointSuffix=core.windows.net`;
  }
  
  return null;
};

// Instructions for setting up Azure Blob Storage:
/*
1. Create an Azure Storage Account:
   - Go to Azure Portal (portal.azure.com)
   - Create a new Resource Group (or use existing)
   - Create a Storage Account with these settings:
     * Performance: Standard
     * Replication: LRS (Locally Redundant Storage)
     * Access tier: Hot

2. Get your credentials:
   Option A - Connection String (Recommended):
   - Go to Storage Account > Access Keys
   - Copy "Connection string" from Key1 or Key2
   
   Option B - Account Name + Key:
   - Account name: Your storage account name
   - Account key: Key1 or Key2 from Access Keys

3. Create a container:
   - Go to Storage Account > Containers
   - Create a new container named "uploads" (or your preferred name)
   - Set public access level to "Blob" for public read access

4. Set environment variables in your .env file:
   
   # Option A - Using connection string (recommended)
   VITE_AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=youraccount;AccountKey=yourkey;EndpointSuffix=core.windows.net"
   VITE_AZURE_STORAGE_CONTAINER_NAME="uploads"
   
   # Option B - Using account name and key
   VITE_AZURE_STORAGE_ACCOUNT_NAME="youraccount"
   VITE_AZURE_STORAGE_ACCOUNT_KEY="yourkey"
   VITE_AZURE_STORAGE_CONTAINER_NAME="uploads"

5. Restart your development server after adding environment variables

Note: The app will work with a fallback method (base64) if Azure is not configured,
but for production, you should set up proper Azure Blob Storage.
*/
