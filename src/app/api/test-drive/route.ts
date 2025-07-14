import { NextResponse } from 'next/server';
import { getFilesFromFolder } from '@/lib/googleDrive';

export async function GET() {
  try {
    // Test the connection with your main folder
    const folderId = process.env.DRIVE_FOLDER_MAIN;
    
    if (!folderId) {
      return NextResponse.json(
        { error: 'DRIVE_FOLDER_MAIN not configured in environment variables' },
        { status: 400 }
      );
    }

    console.log('Testing Google Drive connection...');
    console.log('Folder ID:', folderId);
    console.log('Service Email:', process.env.GOOGLE_CLIENT_EMAIL);

    const files = await getFilesFromFolder(folderId);
    
    return NextResponse.json({
      success: true,
      message: 'Google Drive connection successful!',
      folderInfo: {
        folderId,
        totalFiles: files.length,
        serviceEmail: process.env.GOOGLE_CLIENT_EMAIL,
        projectId: process.env.GOOGLE_PROJECT_ID,
      },
      files: files.slice(0, 5).map(file => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size,
        createdTime: file.createdTime,
      })),
      sampleUrls: files.slice(0, 3).map(file => ({
        name: file.name,
        thumbnailLink: file.thumbnailLink,
        webViewLink: file.webViewLink,
      }))
    });

  } catch (error) {
    console.error('Google Drive test failed:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to connect to Google Drive',
        details: error instanceof Error ? error.message : 'Unknown error',
        troubleshooting: {
          checkList: [
            'Verify GOOGLE_CLIENT_EMAIL is correct',
            'Verify GOOGLE_PRIVATE_KEY is properly formatted',
            'Verify GOOGLE_PROJECT_ID matches your project',
            'Ensure the service account has access to the folder',
            'Check if Google Drive API is enabled in your project'
          ]
        }
      },
      { status: 500 }
    );
  }
}
