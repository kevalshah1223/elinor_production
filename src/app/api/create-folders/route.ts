import { NextResponse } from 'next/server';
import { createFolder } from '@/lib/googleDrive';

export async function POST() {
  try {
    const mainFolderId = process.env.DRIVE_FOLDER_MAIN;
    
    if (!mainFolderId) {
      return NextResponse.json(
        { error: 'DRIVE_FOLDER_MAIN not configured in environment variables' },
        { status: 400 }
      );
    }

    console.log('🚀 Creating Google Drive folder structure...');

    // Define the folder structure
    const folders = [
      {
        name: '📸 Wedding Photography',
        description: 'Wedding ceremony and reception photos',
        subfolders: [
          '🎭 Ceremony',
          '🎉 Reception', 
          '👰 Bridal Portraits',
          '🤵 Groom Portraits',
          '👨‍👩‍👧‍👦 Family Photos',
          '💑 Couple Shots'
        ]
      },
      {
        name: '💕 Pre-Wedding Photography',
        description: 'Engagement and pre-wedding photo sessions',
        subfolders: [
          '💍 Engagement Session',
          '🌅 Outdoor Shoots',
          '🏠 Indoor Sessions',
          '🎨 Creative Concepts',
          '📱 Social Media Ready'
        ]
      },
      {
        name: '👗 Fashion Photography',
        description: 'Fashion shoots and model portfolios',
        subfolders: [
          '📸 Studio Sessions',
          '🌆 Urban Fashion',
          '🌿 Nature Fashion',
          '👔 Men\'s Fashion',
          '👗 Women\'s Fashion',
          '👶 Kids Fashion'
        ]
      },
      {
        name: '🎊 Event Photography',
        description: 'Corporate events, parties, and celebrations',
        subfolders: [
          '🏢 Corporate Events',
          '🎂 Birthday Parties',
          '🎓 Graduations',
          '🎪 Cultural Events',
          '🏆 Award Ceremonies',
          '🎈 Private Parties'
        ]
      },
      {
        name: '🎬 Video Content',
        description: 'Wedding films, reels, and video content',
        subfolders: [
          '💒 Wedding Films',
          '💕 Pre-Wedding Videos',
          '📱 Instagram Reels',
          '🎥 Behind the Scenes',
          '📺 YouTube Content',
          '🎞️ Raw Footage'
        ]
      },
      {
        name: '🌟 Featured Content',
        description: 'Best photos and videos for website showcase',
        subfolders: [
          '🏆 Portfolio Highlights',
          '📱 Social Media Posts',
          '🖼️ Website Gallery',
          '📰 Press & Media',
          '🎯 Client Testimonials'
        ]
      }
    ];

    const createdFolders: any[] = [];
    const errors: string[] = [];

    // Create main category folders
    for (const folder of folders) {
      try {
        console.log(`Creating: ${folder.name}`);
        
        const mainFolder = await createFolder(folder.name, mainFolderId);
        createdFolders.push({
          ...mainFolder,
          description: folder.description,
          subfolders: []
        });
        
        console.log(`✅ Created: ${mainFolder.name} (ID: ${mainFolder.id})`);

        // Create subfolders
        if (folder.subfolders && folder.subfolders.length > 0) {
          const createdSubfolders = [];
          
          for (const subfolderName of folder.subfolders) {
            try {
              const subfolder = await createFolder(subfolderName, mainFolder.id!);
              createdSubfolders.push(subfolder);
              console.log(`   ✅ Created subfolder: ${subfolder.name}`);
            } catch (error) {
              const errorMsg = `Failed to create subfolder ${subfolderName}: ${error instanceof Error ? error.message : 'Unknown error'}`;
              errors.push(errorMsg);
              console.log(`   ❌ ${errorMsg}`);
            }
          }
          
          // Update the main folder with its subfolders
          const folderIndex = createdFolders.length - 1;
          createdFolders[folderIndex].subfolders = createdSubfolders;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        const errorMsg = `Failed to create folder ${folder.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    // Generate environment variable mappings
    const envMappings: Record<string, string> = {};
    
    createdFolders.forEach(folder => {
      const envKey = folder.name.replace(/[^a-zA-Z]/g, '').toUpperCase();
      envMappings[`DRIVE_FOLDER_${envKey}`] = folder.id;
    });

    // Create website category mappings
    const categoryMappings = {
      'DRIVE_FOLDER_WEDDING': createdFolders.find(f => f.name.toLowerCase().includes('wedding'))?.id || mainFolderId,
      'DRIVE_FOLDER_PRE_WEDDING': createdFolders.find(f => f.name.toLowerCase().includes('pre-wedding'))?.id || mainFolderId,
      'DRIVE_FOLDER_FASHION': createdFolders.find(f => f.name.toLowerCase().includes('fashion'))?.id || mainFolderId,
      'DRIVE_FOLDER_EVENTS': createdFolders.find(f => f.name.toLowerCase().includes('event'))?.id || mainFolderId,
      'DRIVE_FOLDER_VIDEOS': createdFolders.find(f => f.name.toLowerCase().includes('video'))?.id || mainFolderId,
      'DRIVE_FOLDER_FEATURED': createdFolders.find(f => f.name.toLowerCase().includes('featured'))?.id || mainFolderId,
    };

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdFolders.length} main folders`,
      createdFolders,
      envMappings,
      categoryMappings,
      errors: errors.length > 0 ? errors : undefined,
      summary: {
        mainFolders: createdFolders.length,
        totalSubfolders: createdFolders.reduce((sum, f) => sum + (f.subfolders?.length || 0), 0),
        errors: errors.length
      }
    });

  } catch (error) {
    console.error('Error creating folder structure:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create folder structure',
        details: error instanceof Error ? error.message : 'Unknown error',
        troubleshooting: [
          'Ensure the service account has Editor permissions on the main folder',
          'Check if Google Drive API is enabled',
          'Verify the main folder ID is correct',
          'Make sure the service account credentials are valid'
        ]
      },
      { status: 500 }
    );
  }
}
