import { BlobServiceClient } from '@azure/storage-blob';
import { azureConfig, isAzureConfigured, getConnectionString } from '../config/azureConfig';

class AzureBlobService {
  constructor() {
    // These will be set later when credentials are provided
    this.blobServiceClient = null;
    this.containerName = azureConfig.containerName || 'uploads';
    
    // Try to initialize if credentials are available
    this.tryInitialize();
  }

  // Try to initialize automatically if credentials are available
  tryInitialize() {
    if (isAzureConfigured()) {
      const connectionString = getConnectionString();
      if (connectionString) {
        this.initialize(connectionString, azureConfig.containerName);
      }
    }
  }

  // Initialize the service with credentials
  initialize(connectionString, containerName = 'uploads') {
    try {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      this.containerName = containerName;
      return true;
    } catch (error) {
      console.error('Failed to initialize Azure Blob Service:', error);
      return false;
    }
  }

  // Upload a file to Azure Blob Storage
  async uploadFile(file, fileName = null) {
    // Fallback mode: if Azure is not configured, use a placeholder or base64
    if (!this.blobServiceClient) {
      console.warn('Azure Blob Service not initialized. Using fallback method.');
      return this.fallbackUpload(file, fileName);
    }

    try {
      // Generate unique filename if not provided
      const blobName = fileName || `${Date.now()}-${file.name}`;
      
      // Get container client
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      
      // Create container if it doesn't exist
      await containerClient.createIfNotExists({
        access: 'blob' // Public read access for images
      });

      // Get blob client
      const blobClient = containerClient.getBlockBlobClient(blobName);

      // Set content type based on file type
      const options = {
        blobHTTPHeaders: {
          blobContentType: file.type
        }
      };

      // Upload the file
      const uploadResponse = await blobClient.uploadData(file, options);

      return {
        success: true,
        url: blobClient.url,
        blobName: blobName,
        uploadResponse
      };
    } catch (error) {
      console.error('Upload failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Delete a file from Azure Blob Storage
  async deleteFile(blobName) {
    if (!this.blobServiceClient) {
      throw new Error('Azure Blob Service not initialized');
    }

    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blobClient = containerClient.getBlockBlobClient(blobName);
      
      await blobClient.delete();
      return { success: true };
    } catch (error) {
      console.error('Delete failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Get file URL
  getFileUrl(blobName) {
    if (!this.blobServiceClient) {
      return null;
    }

    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);
    return blobClient.url;
  }

  // Fallback upload method when Azure is not configured
  async fallbackUpload(file, fileName = null) {
    try {
      // Convert file to base64 data URL for temporary use
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Url = e.target.result;
          
          // For now, we'll return the base64 URL
          // In production, you might want to send this to your backend
          resolve({
            success: true,
            url: base64Url,
            fileName: fileName || `${Date.now()}-${file.name}`,
            message: 'Photo uploaded using fallback method (base64). Configure Azure for cloud storage.'
          });
        };
        reader.onerror = (error) => {
          reject({
            success: false,
            error: 'Failed to process image'
          });
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Fallback upload failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check if Azure is properly configured
  isConfigured() {
    return !!this.blobServiceClient;
  }
}

// Create singleton instance
const azureBlobService = new AzureBlobService();

export default azureBlobService;
