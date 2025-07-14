# Google Drive API Setup Guide

## Current Issue
The error "Failed to fetch images: Bad Request" indicates that the Google Drive API credentials are not properly configured.

## Quick Fix Steps

### 1. Check Environment Variables
The application needs these environment variables in a `.env.local` file:

```bash
# Copy the example file
cp .env.example .env.local
```

### 2. Get Google Drive API Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or select a project**
3. **Enable Google Drive API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

4. **Create Service Account**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the details and create
   - Click on the created service account
   - Go to "Keys" tab > "Add Key" > "Create New Key" > "JSON"
   - Download the JSON file

### 3. Configure Environment Variables

Run the setup script:
```bash
node scripts/setup-google-drive.js
```

Or manually edit `.env.local` with values from your JSON file:
```bash
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID=your-project-id
```

### 4. Set Up Google Drive Folders

1. **Create folder structure in Google Drive**:
   ```
   Elinor Production Media/
   ├── wedding/
   ├── pre-wedding/
   ├── fashion/
   └── events/
   ```

2. **Share folders with service account**:
   - Right-click each folder > "Share"
   - Add your service account email (from GOOGLE_CLIENT_EMAIL)
   - Give "Viewer" permissions

3. **Get folder IDs**:
   - Open each folder in browser
   - Copy the ID from URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
   - Add to `.env.local`:
   ```bash
   DRIVE_FOLDER_MAIN=main-folder-id
   DRIVE_FOLDER_WEDDING=wedding-folder-id
   DRIVE_FOLDER_PRE_WEDDING=pre-wedding-folder-id
   DRIVE_FOLDER_FASHION=fashion-folder-id
   DRIVE_FOLDER_EVENTS=events-folder-id
   ```

### 5. Test the Setup

Visit: http://localhost:3000/api/test-drive

This will test your Google Drive connection and show any issues.

## Troubleshooting

### Common Issues:

1. **"client_email field missing"**: 
   - Check `.env.local` exists and has correct GOOGLE_CLIENT_EMAIL

2. **"Bad Request"**: 
   - Verify private key format (should have \n for line breaks)
   - Ensure service account has access to folders

3. **"Folder not found"**: 
   - Check folder IDs are correct
   - Verify service account has access to folders

4. **"API not enabled"**: 
   - Enable Google Drive API in Google Cloud Console

### Quick Test Commands:

```bash
# Test environment variables
node -e "console.log(process.env.GOOGLE_CLIENT_EMAIL)"

# Test Google Drive connection
curl http://localhost:3000/api/test-drive

# Check folder access
node scripts/get-folder-ids.js
```

## Need Help?

If you're still having issues:
1. Check the browser console for detailed error messages
2. Check the server logs in your terminal
3. Verify all environment variables are set correctly
4. Make sure the service account has proper permissions
