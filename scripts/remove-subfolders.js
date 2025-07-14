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

// Get all subfolders in a folder
const getSubfolders = async (drive, parentId) => {
  try {
    const response = await drive.files.list({
      q: `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
    });

    return response.data.files || [];
  } catch (error) {
    console.error('Error getting subfolders:', error.message);
    return [];
  }
};

// Delete a folder
const deleteFolder = async (drive, folderId, folderName) => {
  try {
    await drive.files.delete({
      fileId: folderId,
    });
    console.log(`   ✅ Deleted: ${folderName}`);
    return true;
  } catch (error) {
    console.error(`   ❌ Failed to delete ${folderName}:`, error.message);
    return false;
  }
};

// Main function to remove subfolders
const removeSubfolders = async () => {
  try {
    console.log('🗂️ Removing subfolders from main category folders...\n');

    const drive = initializeDrive();

    // Main category folders
    const mainFolders = [
      {
        name: '📸 Wedding Photography',
        id: process.env.DRIVE_FOLDER_WEDDING,
      },
      {
        name: '💕 Pre-Wedding Photography',
        id: process.env.DRIVE_FOLDER_PRE_WEDDING,
      },
      {
        name: '👗 Fashion Photography',
        id: process.env.DRIVE_FOLDER_FASHION,
      },
      {
        name: '🎊 Event Photography',
        id: process.env.DRIVE_FOLDER_EVENTS,
      },
      {
        name: '🎬 Video Content',
        id: process.env.DRIVE_FOLDER_VIDEOS,
      },
      {
        name: '🌟 Featured Content',
        id: process.env.DRIVE_FOLDER_FEATURED,
      },
    ];

    let totalDeleted = 0;

    for (const folder of mainFolders) {
      if (!folder.id) {
        console.log(`⚠️ Skipping ${folder.name} - No folder ID found`);
        continue;
      }

      console.log(`📁 Processing: ${folder.name}`);
      
      // Get all subfolders
      const subfolders = await getSubfolders(drive, folder.id);
      
      if (subfolders.length === 0) {
        console.log(`   ℹ️ No subfolders found`);
      } else {
        console.log(`   📂 Found ${subfolders.length} subfolders to delete:`);
        
        // Delete each subfolder
        for (const subfolder of subfolders) {
          const success = await deleteFolder(drive, subfolder.id, subfolder.name);
          if (success) {
            totalDeleted++;
          }
          
          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
      
      console.log(''); // Empty line for readability
    }

    console.log('🎉 Cleanup complete!');
    console.log(`📊 Summary:`);
    console.log(`   📁 Main folders processed: ${mainFolders.length}`);
    console.log(`   🗑️ Subfolders deleted: ${totalDeleted}`);
    
    console.log('\n✅ Your folder structure is now simplified:');
    mainFolders.forEach(folder => {
      if (folder.id) {
        console.log(`   📁 ${folder.name} (ready for direct uploads)`);
      }
    });

    console.log('\n📸 You can now upload images directly to the main folders!');
    console.log('🔗 Main folder: https://drive.google.com/drive/folders/' + process.env.DRIVE_FOLDER_MAIN);

  } catch (error) {
    console.error('❌ Error removing subfolders:', error.message);
    process.exit(1);
  }
};

// Run the script
removeSubfolders();
