import { NextRequest, NextResponse } from 'next/server';
import { getFilesFromFolder, isVideo, getVideoEmbedUrl } from '@/lib/googleDrive';

// Folder mapping for video content
const VIDEO_FOLDER_MAP: Record<string, string> = {
  'wedding-films': process.env.DRIVE_FOLDER_WEDDING || '',
  'pre-wedding': process.env.DRIVE_FOLDER_PRE_WEDDING || '',
  'fashion': process.env.DRIVE_FOLDER_FASHION || '',
  'events': process.env.DRIVE_FOLDER_EVENTS || '',
  'behind-scenes': process.env.DRIVE_FOLDER_BTS || '',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const folderId = VIDEO_FOLDER_MAP[category.toLowerCase()];

    if (!folderId) {
      return NextResponse.json(
        { error: 'Invalid category or folder not configured' },
        { status: 400 }
      );
    }

    // Fetch files from Google Drive
    const files = await getFilesFromFolder(folderId);
    
    // Filter only videos and format response
    const videos = files
      .filter(file => isVideo(file.mimeType || ''))
      .map(file => ({
        id: file.id,
        name: file.name,
        embedUrl: getVideoEmbedUrl(file.id || ''),
        thumbnailUrl: file.thumbnailLink,
        createdTime: file.createdTime,
        size: file.size,
        mimeType: file.mimeType,
        duration: null, // Could be extracted with additional API calls
      }));

    // Cache the response for 1 hour
    const response = NextResponse.json({
      category,
      videos,
      total: videos.length,
      lastUpdated: new Date().toISOString(),
    });

    response.headers.set(
      'Cache-Control',
      `public, s-maxage=${process.env.CACHE_DURATION || 3600}, stale-while-revalidate=86400`
    );

    return response;
  } catch (error) {
    console.error('Error fetching video reels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos from Google Drive' },
      { status: 500 }
    );
  }
}
