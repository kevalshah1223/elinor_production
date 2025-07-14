import { google } from 'googleapis';

// Initialize Google Drive API
const initializeDrive = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      project_id: process.env.GOOGLE_PROJECT_ID,
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  return google.drive({ version: 'v3', auth });
};

// Get files from a specific folder
export const getFilesFromFolder = async (folderId: string) => {
  try {
    const drive = initializeDrive();
    
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink, createdTime, size)',
      orderBy: 'createdTime desc',
      pageSize: 100,
    });

    return response.data.files || [];
  } catch (error) {
    console.error('Error fetching files from Google Drive:', error);
    throw error;
  }
};

// Get direct download link for a file
export const getFileDownloadLink = async (fileId: string) => {
  try {
    const drive = initializeDrive();
    
    const response = await drive.files.get({
      fileId,
      fields: 'webContentLink, webViewLink',
    });

    return response.data;
  } catch (error) {
    console.error('Error getting file download link:', error);
    throw error;
  }
};

// Get optimized image URL for display
export const getOptimizedImageUrl = (file: any) => {
  if (file.thumbnailLink) {
    // Get high-quality thumbnail (replace =s220 with =s800 or =s1600)
    return file.thumbnailLink.replace('=s220', '=s800');
  }
  
  // Fallback to direct link for images
  if (file.mimeType?.startsWith('image/')) {
    return `https://drive.google.com/uc?id=${file.id}&export=view`;
  }
  
  return null;
};

// Check if file is an image
export const isImage = (mimeType: string) => {
  return mimeType?.startsWith('image/');
};

// Check if file is a video
export const isVideo = (mimeType: string) => {
  return mimeType?.startsWith('video/');
};

// Get video embed URL with controls hidden
export const getVideoEmbedUrl = (fileId: string) => {
  return `https://drive.google.com/file/d/${fileId}/preview?usp=embed_facebook&rm=minimal`;
};

// Get video thumbnail URL
export const getVideoThumbnailUrl = (fileId: string) => {
  return `https://drive.google.com/uc?id=${fileId}&export=view`;
};

// Format file size
export const formatFileSize = (bytes: string | number) => {
  const size = typeof bytes === 'string' ? parseInt(bytes) : bytes;
  if (!size) return 'Unknown size';

  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let fileSize = size;

  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024;
    unitIndex++;
  }

  return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
};

// Create a folder in Google Drive
export const createFolder = async (name: string, parentId: string) => {
  try {
    const drive = initializeDrive();

    const response = await drive.files.create({
      requestBody: {
        name: name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      },
      fields: 'id, name, webViewLink, parents',
    });

    return response.data;
  } catch (error) {
    console.error(`Error creating folder ${name}:`, error);
    throw error;
  }
};
