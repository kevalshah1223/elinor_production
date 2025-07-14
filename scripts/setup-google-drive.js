#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Google Drive Setup for Elinor Production\n');

async function setupGoogleDrive() {
  try {
    console.log('Please provide the path to your downloaded JSON key file:');
    
    const jsonPath = await new Promise((resolve) => {
      rl.question('JSON file path: ', resolve);
    });

    // Read the JSON file
    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
    const credentials = JSON.parse(jsonContent);

    // Extract the private key
    const privateKey = credentials.private_key.replace(/\n/g, '\\n');

    // Create the .env.local content
    const envContent = `# Google Drive API Configuration
GOOGLE_CLIENT_EMAIL=${credentials.client_email}
GOOGLE_PRIVATE_KEY="${privateKey}"
GOOGLE_PROJECT_ID=${credentials.project_id}

# Google Drive Folder IDs
# Main folder: https://drive.google.com/drive/folders/1-o5xYODyepSLiQ_U3UyF7KIx95vtFNc4
DRIVE_FOLDER_MAIN=1-o5xYODyepSLiQ_U3UyF7KIx95vtFNc4

# Sub-folders (update these with actual folder IDs when you create them)
DRIVE_FOLDER_WEDDING=1-o5xYODyepSLiQ_U3UyF7KIx95vtFNc4
DRIVE_FOLDER_PRE_WEDDING=1-o5xYODyepSLiQ_U3UyF7KIx95vtFNc4
DRIVE_FOLDER_FASHION=1-o5xYODyepSLiQ_U3UyF7KIx95vtFNc4
DRIVE_FOLDER_EVENTS=1-o5xYODyepSLiQ_U3UyF7KIx95vtFNc4

# Optional: For caching
CACHE_DURATION=3600
`;

    // Write to .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Successfully created .env.local file!');
    console.log('\n📋 Next steps:');
    console.log('1. Share your Google Drive folder with the service account:');
    console.log(`   ${credentials.client_email}`);
    console.log('2. Create sub-folders in your Drive folder for different categories');
    console.log('3. Update the folder IDs in .env.local with the actual sub-folder IDs');
    console.log('4. Test the integration by running: npm run dev');

  } catch (error) {
    console.error('❌ Error setting up Google Drive:', error.message);
  } finally {
    rl.close();
  }
}

setupGoogleDrive();
