import { NextRequest, NextResponse } from 'next/server';
import { initializeDrive } from '@/lib/googleDrive';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;
    
    if (!fileId) {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
    }

    console.log(`🖼️ Proxying image for file ID: ${fileId}`);

    const drive = initializeDrive();
    
    // Get file metadata first
    const fileMetadata = await drive.files.get({
      fileId,
      fields: 'mimeType, name, thumbnailLink',
    });

    // If there's a thumbnail link, try to use it
    if (fileMetadata.data.thumbnailLink) {
      const thumbnailUrl = fileMetadata.data.thumbnailLink.replace('=s220', '=s800');
      console.log(`📸 Using thumbnail URL: ${thumbnailUrl}`);
      
      try {
        const response = await fetch(thumbnailUrl);
        if (response.ok) {
          const imageBuffer = await response.arrayBuffer();
          return new NextResponse(imageBuffer, {
            headers: {
              'Content-Type': fileMetadata.data.mimeType || 'image/jpeg',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      } catch (error) {
        console.log(`⚠️ Thumbnail fetch failed: ${error}`);
      }
    }

    // Fallback: try to get the file directly
    try {
      const fileResponse = await drive.files.get({
        fileId,
        alt: 'media',
      });

      if (fileResponse.data) {
        return new NextResponse(fileResponse.data as any, {
          headers: {
            'Content-Type': fileMetadata.data.mimeType || 'image/jpeg',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }
    } catch (error) {
      console.log(`⚠️ Direct file fetch failed: ${error}`);
    }

    // If all else fails, return placeholder
    return NextResponse.redirect(new URL('/placeholder-image.svg', request.url));

  } catch (error) {
    console.error('❌ Error proxying image:', error);
    return NextResponse.redirect(new URL('/placeholder-image.svg', request.url));
  }
}
