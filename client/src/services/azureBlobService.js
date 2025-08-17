import { Buffer } from 'buffer';
import { azureConfig } from '../config/azureConfig';

// Make Buffer available globally
window.Buffer = window.Buffer || Buffer;

class AzureBlobService {
  constructor() {
    this.containerName = azureConfig.containerName || 'uploads';
    this.tryInitialize();
  }

  tryInitialize() {
    console.log('Azure Blob Service - Backend Upload Mode');
    console.log('Files will be uploaded via backend API to Azure storage');
  }

  initialize() {
    // Backend will handle Azure initialization
    console.log('Using backend API for Azure uploads');
    return true;
  }

  async uploadFile(file, fileName) {
    try {
      console.log(`Uploading file via backend: ${fileName || file.name}`);
      
      // Generate unique filename if not provided
      const finalFileName = fileName || this.generateUniqueFileName(file.name);
      
      // Create FormData to send file to backend
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', finalFileName);
      formData.append('containerName', this.containerName);

      // Send file to backend for Azure upload
      const backendUrl = import.meta.env.VITE_BACKEND_URI || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/azure/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('File uploaded successfully via backend:', result.url);
        return {
          success: true,
          url: result.url,
          fileName: result.fileName,
          message: result.message
        };
      } else {
        throw new Error(result.message || 'Upload failed');
      }
      
    } catch (error) {
      console.error('Error uploading file via backend:', error);
      return {
        success: false,
        error: error.message,
        url: null
      };
    }
  }

  fallbackUpload(file, fileName) {
    console.log('Using fallback upload method (Base64)');
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  async testConnection() {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URI || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/azure/test`);
      const result = await response.json();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  isInitialized() {
    return true; // Backend handles initialization
  }

  async reinitialize() {
    return true; // Backend handles reinitialization
  }

  // Additional utility methods for file validation
  isValidFileType(file) {
    const allowedTypes = [
      // Document types
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      // Image types
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp'
    ];
    return allowedTypes.includes(file.type);
  }

  isValidFileSize(file, maxSizeMB = 10) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  }

  validateFile(file) {
    const errors = [];
    
    if (!this.isValidFileType(file)) {
      errors.push('Invalid file type. Only PDF, DOC, DOCX, TXT, JPG, JPEG, PNG, GIF, and WEBP files are allowed.');
    }
    
    if (!this.isValidFileSize(file)) {
      errors.push('File size too large. Maximum size is 10MB.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  generateUniqueFileName(originalName) {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    return `cv_${timestamp}_${randomString}.${extension}`;
  }

  // Method to upload with validation
  async uploadFileWithValidation(file, customFileName = null) {
    try {
      // Validate file first
      const validation = this.validateFile(file);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(' '),
          url: null
        };
      }

      // Generate unique filename if not provided
      const fileName = customFileName || this.generateUniqueFileName(file.name);
      
      // Upload the file
      const result = await this.uploadFile(file, fileName);
      return result;
      
    } catch (error) {
      console.error('File upload validation failed:', error);
      return {
        success: false,
        error: error.message,
        url: null
      };
    }
  }

  // Method to get file info
  getFileInfo(file) {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      sizeInMB: (file.size / (1024 * 1024)).toFixed(2)
    };
  }
}

const azureBlobService = new AzureBlobService();

export default azureBlobService;