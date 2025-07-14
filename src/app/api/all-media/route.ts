import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Drive configuration
const FOLDER_ID = '1-o5xYODyepSLiQ_U3UyF7KIx95vtFNc4'; // Main folder ID

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  size?: string;
  parents?: string[];
  videoMediaMetadata?: {
    durationMillis?: string;
  };
}

interface MediaItem {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  createdTime: string;
  size: string;
  mimeType: string;
  type: 'image' | 'video';
  category: string;
  embedUrl?: string;
  duration?: string;
}

async function getGoogleDriveClient() {
  try {
    const credentials = {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      project_id: process.env.GOOGLE_PROJECT_ID,
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    return google.drive({ version: 'v3', auth });
  } catch (error) {
    console.error('Error creating Google Drive client:', error);
    throw error;
  }
}

async function getAllMediaFromDrive(): Promise<MediaItem[]> {
  try {
    console.log('📁 Fetching all media from Google Drive...');
    
    const drive = await getGoogleDriveClient();
    
    // Get all folders (categories) in the main folder
    const foldersResponse = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
    });

    const folders = foldersResponse.data.files || [];
    console.log(`📂 Found ${folders.length} categories:`, folders.map(f => f.name));

    const allMedia: MediaItem[] = [];

    // Process each category folder
    for (const folder of folders) {
      if (!folder.id || !folder.name) continue;

      // Clean up category name - remove emojis and extra text
      let categoryName = folder.name
        .replace(/[^\w\s-]/g, '') // Remove emojis and special characters
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

      // Map common folder names to clean categories
      const categoryMappings: { [key: string]: string } = {
        'featured-content': 'featured',
        'video-content': 'videos',
        'event-photography': 'events',
        'fashion-photography': 'fashion',
        'pre-wedding-photography': 'pre-wedding',
        'wedding-photography': 'wedding'
      };

      categoryName = categoryMappings[categoryName] || categoryName;
      console.log(`📸 Processing category: ${categoryName} (from folder: ${folder.name})`);

      // Get all files in this category folder
      const filesResponse = await drive.files.list({
        q: `'${folder.id}' in parents and trashed=false`,
        fields: 'files(id, name, mimeType, createdTime, size, videoMediaMetadata, thumbnailLink)',
        orderBy: 'createdTime desc',
        pageSize: 100, // Get more files
      });

      const files = filesResponse.data.files || [];
      console.log(`📄 Found ${files.length} files in ${categoryName}`);

      // Process each file
      for (const file of files) {
        if (!file.id || !file.name || !file.mimeType) continue;

        const isImage = file.mimeType.startsWith('image/');
        const isVideo = file.mimeType.startsWith('video/');

        if (!isImage && !isVideo) continue;

        const mediaItem: MediaItem = {
          id: file.id,
          name: file.name,
          url: `https://drive.google.com/file/d/${file.id}/view`,
          thumbnailUrl: file.thumbnailLink?.replace('=s220', '=s800') || '/placeholder-image.svg',
          createdTime: file.createdTime || new Date().toISOString(),
          size: file.size || '0',
          mimeType: file.mimeType,
          type: isImage ? 'image' : 'video',
          category: categoryName,
        };

        // Add video-specific properties
        if (isVideo) {
          mediaItem.embedUrl = `https://drive.google.com/file/d/${file.id}/preview`;
          if (file.videoMediaMetadata?.durationMillis) {
            const durationSeconds = Math.floor(parseInt(file.videoMediaMetadata.durationMillis) / 1000);
            const minutes = Math.floor(durationSeconds / 60);
            const seconds = durationSeconds % 60;
            mediaItem.duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
          }
        }

        allMedia.push(mediaItem);
      }
    }

    // Sort all media by creation time (newest first)
    allMedia.sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());

    console.log(`✅ Total media items processed: ${allMedia.length}`);
    console.log(`📊 Breakdown: ${allMedia.filter(m => m.type === 'image').length} images, ${allMedia.filter(m => m.type === 'video').length} videos`);

    return allMedia;

  } catch (error) {
    console.error('❌ Error fetching media from Google Drive:', error);
    return [];
  }
}

export async function GET() {
  try {
    console.log('🎬 Loading all media from Google Drive...');

    const media = await getAllMediaFromDrive();
    
    // Get unique categories
    const categories = [...new Set(media.map(item => item.category))];

    const response = NextResponse.json({
      success: true,
      media,
      total: media.length,
      categories,
      lastUpdated: new Date().toISOString(),
      breakdown: {
        images: media.filter(m => m.type === 'image').length,
        videos: media.filter(m => m.type === 'video').length,
        categories: categories.length,
      }
    });

    // Cache for 5 minutes with stale-while-revalidate for better performance
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return response;
  } catch (error) {
    console.error('❌ Error in all-media API:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to load media',
      media: [],
      total: 0,
      categories: [],
      lastUpdated: new Date().toISOString()
    }, { status: 500 });
  }
}
