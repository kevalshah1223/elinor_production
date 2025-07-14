#!/usr/bin/env node

const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

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

// Create a folder in Google Drive
const createFolder = async (drive, name, parentId) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      },
      fields: 'id, name, webViewLink',
    });

    return response.data;
  } catch (error) {
    console.error(`Error creating folder ${name}:`, error.message);
    throw error;
  }
};

// Main function to create folder structure
const createFolderStructure = async () => {
  try {
    console.log('🚀 Creating Google Drive folder structure for Elinor Production...\n');

    const drive = initializeDrive();
    const mainFolderId = process.env.DRIVE_FOLDER_MAIN;

    if (!mainFolderId) {
      throw new Error('DRIVE_FOLDER_MAIN not found in environment variables');
    }

    console.log(`📁 Main folder ID: ${mainFolderId}`);

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

    const createdFolders = {};
    const envUpdates = [];

    // Create main category folders
    for (const folder of folders) {
      console.log(`\n📁 Creating: ${folder.name}`);
      
      const mainFolder = await createFolder(drive, folder.name, mainFolderId);
      createdFolders[folder.name] = mainFolder;
      
      console.log(`   ✅ Created: ${mainFolder.name} (ID: ${mainFolder.id})`);
      console.log(`   🔗 Link: ${mainFolder.webViewLink}`);

      // Add to environment variables
      const envKey = folder.name.replace(/[^a-zA-Z]/g, '').toUpperCase();
      envUpdates.push(`DRIVE_FOLDER_${envKey}=${mainFolder.id}`);

      // Create subfolders
      if (folder.subfolders && folder.subfolders.length > 0) {
        console.log(`   📂 Creating subfolders:`);
        
        for (const subfolderName of folder.subfolders) {
          try {
            const subfolder = await createFolder(drive, subfolderName, mainFolder.id);
            console.log(`      ✅ ${subfolder.name} (ID: ${subfolder.id})`);
          } catch (error) {
            console.log(`      ❌ Failed to create ${subfolderName}: ${error.message}`);
          }
        }
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Generate updated .env.local content
    console.log('\n📝 Updating .env.local with new folder IDs...');
    
    const envContent = `# Google Drive API Configuration
GOOGLE_CLIENT_EMAIL=${process.env.GOOGLE_CLIENT_EMAIL}
GOOGLE_PRIVATE_KEY="${process.env.GOOGLE_PRIVATE_KEY}"
GOOGLE_PROJECT_ID=${process.env.GOOGLE_PROJECT_ID}

# Google Drive Folder IDs
DRIVE_FOLDER_MAIN=${mainFolderId}

# Category Folders (Auto-generated)
${envUpdates.join('\n')}

# Legacy folder mappings for website compatibility
DRIVE_FOLDER_WEDDING=${createdFolders['📸 Wedding Photography']?.id || mainFolderId}
DRIVE_FOLDER_PRE_WEDDING=${createdFolders['💕 Pre-Wedding Photography']?.id || mainFolderId}
DRIVE_FOLDER_FASHION=${createdFolders['👗 Fashion Photography']?.id || mainFolderId}
DRIVE_FOLDER_EVENTS=${createdFolders['🎊 Event Photography']?.id || mainFolderId}
DRIVE_FOLDER_VIDEOS=${createdFolders['🎬 Video Content']?.id || mainFolderId}
DRIVE_FOLDER_FEATURED=${createdFolders['🌟 Featured Content']?.id || mainFolderId}

# Optional: For caching
CACHE_DURATION=3600
`;

    // Write updated .env.local
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(process.cwd(), '.env.local');
    fs.writeFileSync(envPath, envContent);

    console.log('\n🎉 Folder structure created successfully!');
    console.log('\n📋 Summary:');
    console.log(`   📁 Main categories: ${folders.length}`);
    console.log(`   📂 Total subfolders: ${folders.reduce((sum, f) => sum + (f.subfolders?.length || 0), 0)}`);
    console.log(`   📝 Environment variables updated`);

    console.log('\n🔗 Folder Links:');
    Object.values(createdFolders).forEach(folder => {
      console.log(`   ${folder.name}: ${folder.webViewLink}`);
    });

    console.log('\n📸 How to use:');
    console.log('1. Upload wedding photos to: 📸 Wedding Photography');
    console.log('2. Upload pre-wedding photos to: 💕 Pre-Wedding Photography');
    console.log('3. Upload fashion photos to: 👗 Fashion Photography');
    console.log('4. Upload event photos to: 🎊 Event Photography');
    console.log('5. Upload videos to: 🎬 Video Content');
    console.log('6. Add best content to: 🌟 Featured Content');

    console.log('\n✅ Your website will automatically display content from these folders!');

  } catch (error) {
    console.error('❌ Error creating folder structure:', error.message);
    process.exit(1);
  }
};

// Run the script
createFolderStructure();
