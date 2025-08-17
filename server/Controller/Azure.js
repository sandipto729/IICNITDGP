const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Azure Blob Storage configuration
const azureConfig = {
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  accountKey: process.env.AZURE_STORAGE_ACCOUNT_KEY,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME || 'uploads'
};

// Initialize Azure Blob Service Client
let blobServiceClient = null;

const initializeAzure = () => {
  try {
    if (azureConfig.connectionString) {
      blobServiceClient = BlobServiceClient.fromConnectionString(azureConfig.connectionString);
      console.log('Azure Blob Service initialized successfully');
      return true;
    } else if (azureConfig.accountName && azureConfig.accountKey) {
      const connectionString = `DefaultEndpointsProtocol=https;AccountName=${azureConfig.accountName};AccountKey=${azureConfig.accountKey};EndpointSuffix=core.windows.net`;
      blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      console.log('Azure Blob Service initialized with account credentials');
      return true;
    } else {
      console.log('Azure credentials not found');
      return false;
    }
  } catch (error) {
    console.error('Failed to initialize Azure Blob Service:', error);
    return false;
  }
};

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow common file types for CV uploads and images
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, TXT, JPG, JPEG, PNG, GIF, and WEBP files are allowed.'), false);
    }
  }
});

// Upload file to Azure Blob Storage
const uploadToAzure = async (req, res) => {
  try {
    console.log('Azure upload request received');

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided'
      });
    }

    // Initialize Azure if not already done
    if (!blobServiceClient) {
      const initialized = initializeAzure();
      if (!initialized) {
        return res.status(500).json({
          success: false,
          message: 'Azure storage not configured'
        });
      }
    }

    const { fileName, containerName } = req.body;
    const container = containerName || azureConfig.containerName;
    
    // Generate unique filename to avoid conflicts
    const fileExtension = req.file.originalname.split('.').pop();
    const timestamp = new Date().getTime();
    const uniqueFileName = fileName && fileName !== 'undefined' 
      ? fileName 
      : `cv_${timestamp}_${uuidv4().substring(0, 8)}.${fileExtension}`;

    console.log(`Uploading file: ${uniqueFileName} to container: ${container}`);

    // Get container client
    const containerClient = blobServiceClient.getContainerClient(container);
    
    // Create container if it doesn't exist
    await containerClient.createIfNotExists({
      access: 'blob' // Allow public read access to blobs
    });

    // Get blob client
    const blobClient = containerClient.getBlockBlobClient(uniqueFileName);
    
    // Upload the file
    const uploadResponse = await blobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: {
        blobContentType: req.file.mimetype
      }
    });

    console.log('File uploaded successfully to Azure:', uploadResponse.requestId);

    // Return the blob URL
    res.json({
      success: true,
      message: 'File uploaded successfully',
      url: blobClient.url,
      fileName: uniqueFileName,
      requestId: uploadResponse.requestId
    });

  } catch (error) {
    console.error('Error uploading to Azure:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload file to Azure storage'
    });
  }
};

// Test Azure connection
const testAzureConnection = async (req, res) => {
  try {
    const initialized = initializeAzure();
    
    if (!initialized) {
      return res.json({
        success: false,
        error: 'Azure storage not configured'
      });
    }

    // Try to list containers as a connection test
    const containerClient = blobServiceClient.getContainerClient(azureConfig.containerName);
    await containerClient.getProperties();

    res.json({
      success: true,
      message: 'Azure connection successful',
      containerName: azureConfig.containerName
    });

  } catch (error) {
    console.error('Azure connection test failed:', error);
    res.json({
      success: false,
      error: error.message
    });
  }
};

// Initialize Azure on module load
initializeAzure();

module.exports = {
  upload,
  uploadToAzure,
  testAzureConnection
};
