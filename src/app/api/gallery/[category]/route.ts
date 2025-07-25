import { NextRequest, NextResponse } from 'next/server';
import { getFilesFromFolder, isImage, isVideo, getOptimizedImageUrl, getVideoEmbedUrl, getVideoThumbnailUrl } from '@/lib/googleDrive';

// Folder mapping
const FOLDER_MAP: Record<string, string> = {
  'wedding': process.env.DRIVE_FOLDER_WEDDING || '',
  'pre-wedding': process.env.DRIVE_FOLDER_PRE_WEDDING || '',
  'fashion': process.env.DRIVE_FOLDER_FASHION || '',
  'events': process.env.DRIVE_FOLDER_EVENTS || '',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const folderId = FOLDER_MAP[category.toLowerCase()];

    if (!folderId) {
      return NextResponse.json(
        { error: 'Invalid category or folder not configured' },
        { status: 400 }
      );
    }

    // Fetch files from Google Drive
    const files = await getFilesFromFolder(folderId);

    // Filter images and format response
    const images = files
      .filter(file => isImage(file.mimeType || ''))
      .map(file => ({
        id: file.id,
        name: file.name,
        url: getOptimizedImageUrl(file),
        thumbnailUrl: file.thumbnailLink,
        createdTime: file.createdTime,
        size: file.size,
        mimeType: file.mimeType,
        type: 'image' as const,
      }))
      .filter(image => image.url); // Only include images with valid URLs

    // Filter videos and format response
    const videos = files
      .filter(file => isVideo(file.mimeType || ''))
      .map(file => ({
        id: file.id,
        name: file.name,
        url: getVideoEmbedUrl(file.id || ''),
        thumbnailUrl: file.thumbnailLink?.replace('=s220', '=s800') || getVideoThumbnailUrl(file.id || ''),
        createdTime: file.createdTime,
        size: file.size,
        mimeType: file.mimeType,
        type: 'video' as const,
      }));

    // Combine images and videos
    const allMedia = [...images, ...videos];

    // Cache the response for 1 hour
    const response = NextResponse.json({
      category,
      images,
      videos,
      media: allMedia,
      total: allMedia.length,
      lastUpdated: new Date().toISOString(),
    });

    response.headers.set(
      'Cache-Control',
      `public, s-maxage=${process.env.CACHE_DURATION || 3600}, stale-while-revalidate=86400`
    );

    return response;
  } catch (error) {
    console.error('Error fetching gallery images:', error);

    // Provide more specific error messages
    let errorMessage = 'Failed to fetch images from Google Drive';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('client_email')) {
        errorMessage = 'Google Drive API credentials not configured. Please check your environment variables.';
        statusCode = 400;
      } else if (error.message.includes('private_key')) {
        errorMessage = 'Google Drive API private key is invalid. Please check your GOOGLE_PRIVATE_KEY environment variable.';
        statusCode = 400;
      } else if (error.message.includes('not found')) {
        errorMessage = 'Google Drive folder not found. Please check your folder ID and permissions.';
        statusCode = 404;
      } else if (error.message.includes('permission')) {
        errorMessage = 'Access denied to Google Drive folder. Please share the folder with your service account.';
        statusCode = 403;
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.message : 'Unknown error',
        troubleshooting: {
          steps: [
            'Check /api/diagnose for configuration issues',
            'Verify Google Drive API credentials in .env.local',
            'Ensure service account has access to the folder',
            'Test connection at /api/test-drive'
          ]
        }
      },
      { status: statusCode }
    );
  }
}
