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
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  return google.drive({ version: 'v3', auth });
};

// Get all folders in the main directory
const getFolderIds = async () => {
  try {
    console.log('🔍 Scanning Google Drive for folder structure...\n');

    const drive = initializeDrive();
    const mainFolderId = process.env.DRIVE_FOLDER_MAIN;

    if (!mainFolderId) {
      throw new Error('DRIVE_FOLDER_MAIN not found in environment variables');
    }

    console.log(`📁 Main folder ID: ${mainFolderId}\n`);

    // Get all folders in the main directory
    const response = await drive.files.list({
      q: `'${mainFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name, webViewLink)',
      orderBy: 'name',
    });

    const folders = response.data.files || [];

    if (folders.length === 0) {
      console.log('❌ No folders found in the main directory.');
      console.log('\n📋 Please create the folders manually first:');
      console.log('1. Go to: https://drive.google.com/drive/folders/' + mainFolderId);
      console.log('2. Create the main category folders');
      console.log('3. Run this script again');
      return;
    }

    console.log('📂 Found folders:');
    console.log('================\n');

    const folderMappings = {};
    
    folders.forEach((folder, index) => {
      console.log(`${index + 1}. ${folder.name}`);
      console.log(`   ID: ${folder.id}`);
      console.log(`   Link: ${folder.webViewLink}\n`);
      
      // Create environment variable mapping
      const envKey = folder.name.replace(/[^a-zA-Z]/g, '').toUpperCase();
      folderMappings[`DRIVE_FOLDER_${envKey}`] = folder.id;
    });

    // Generate updated .env.local content
    console.log('📝 Environment Variables:');
    console.log('========================\n');

    const envUpdates = Object.entries(folderMappings)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    console.log(envUpdates);

    // Create mapping for website categories
    const categoryMappings = {
      'DRIVE_FOLDER_WEDDING': folders.find(f => f.name.toLowerCase().includes('wedding'))?.id || mainFolderId,
      'DRIVE_FOLDER_PRE_WEDDING': folders.find(f => f.name.toLowerCase().includes('pre-wedding') || f.name.toLowerCase().includes('prewedding'))?.id || mainFolderId,
      'DRIVE_FOLDER_FASHION': folders.find(f => f.name.toLowerCase().includes('fashion'))?.id || mainFolderId,
      'DRIVE_FOLDER_EVENTS': folders.find(f => f.name.toLowerCase().includes('event'))?.id || mainFolderId,
      'DRIVE_FOLDER_VIDEOS': folders.find(f => f.name.toLowerCase().includes('video'))?.id || mainFolderId,
      'DRIVE_FOLDER_FEATURED': folders.find(f => f.name.toLowerCase().includes('featured'))?.id || mainFolderId,
    };

    console.log('\n🎯 Website Category Mappings:');
    console.log('============================\n');
    
    Object.entries(categoryMappings).forEach(([key, value]) => {
      const folderName = folders.find(f => f.id === value)?.name || 'Main Folder';
      console.log(`${key}=${value} # ${folderName}`);
    });

    // Generate complete .env.local content
    const completeEnvContent = `# Google Drive API Configuration
GOOGLE_CLIENT_EMAIL=${process.env.GOOGLE_CLIENT_EMAIL}
GOOGLE_PRIVATE_KEY="${process.env.GOOGLE_PRIVATE_KEY}"
GOOGLE_PROJECT_ID=${process.env.GOOGLE_PROJECT_ID}

# Google Drive Folder IDs
DRIVE_FOLDER_MAIN=${mainFolderId}

# Category Folders
${envUpdates}

# Website Category Mappings
${Object.entries(categoryMappings).map(([key, value]) => `${key}=${value}`).join('\n')}

# Optional: For caching
CACHE_DURATION=3600
`;

    // Write to file
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(process.cwd(), '.env.local');
    fs.writeFileSync(envPath, completeEnvContent);

    console.log('\n✅ Updated .env.local with folder IDs!');
    console.log('\n🎉 Setup complete! Your website can now access:');
    folders.forEach(folder => {
      console.log(`   📁 ${folder.name}`);
    });

    console.log('\n📸 Next steps:');
    console.log('1. Upload some test images to the folders');
    console.log('2. Visit http://localhost:3000/test-drive to verify');
    console.log('3. Check the gallery at http://localhost:3000/gallery');

  } catch (error) {
    console.error('❌ Error getting folder IDs:', error.message);
    
    if (error.message.includes('File not found')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Make sure you shared the folder with the service account');
      console.log('2. Service account email: ' + process.env.GOOGLE_CLIENT_EMAIL);
      console.log('3. Give "Editor" or "Viewer" permissions');
      console.log('4. Wait a few minutes for permissions to propagate');
    }
  }
};

// Run the script
getFolderIds();
