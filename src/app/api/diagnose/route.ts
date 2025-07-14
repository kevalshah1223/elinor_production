import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasGoogleClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
        hasGooglePrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
        hasGoogleProjectId: !!process.env.GOOGLE_PROJECT_ID,
        hasDriveFolderMain: !!process.env.DRIVE_FOLDER_MAIN,
        hasDriveFolderWedding: !!process.env.DRIVE_FOLDER_WEDDING,
        hasDriveFolderPreWedding: !!process.env.DRIVE_FOLDER_PRE_WEDDING,
        hasDriveFolderFashion: !!process.env.DRIVE_FOLDER_FASHION,
        hasDriveFolderEvents: !!process.env.DRIVE_FOLDER_EVENTS,
      },
      values: {
        googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL ? 
          process.env.GOOGLE_CLIENT_EMAIL.substring(0, 20) + '...' : 'NOT_SET',
        googleProjectId: process.env.GOOGLE_PROJECT_ID || 'NOT_SET',
        privateKeyLength: process.env.GOOGLE_PRIVATE_KEY?.length || 0,
        cacheDuration: process.env.CACHE_DURATION || '3600 (default)',
      },
      issues: [] as string[],
      recommendations: [] as string[],
    };

    // Check for common issues
    if (!process.env.GOOGLE_CLIENT_EMAIL) {
      diagnostics.issues.push('GOOGLE_CLIENT_EMAIL is not set');
      diagnostics.recommendations.push('Add GOOGLE_CLIENT_EMAIL to your .env.local file');
    }

    if (!process.env.GOOGLE_PRIVATE_KEY) {
      diagnostics.issues.push('GOOGLE_PRIVATE_KEY is not set');
      diagnostics.recommendations.push('Add GOOGLE_PRIVATE_KEY to your .env.local file');
    } else if (process.env.GOOGLE_PRIVATE_KEY.length < 100) {
      diagnostics.issues.push('GOOGLE_PRIVATE_KEY appears to be too short');
      diagnostics.recommendations.push('Verify the private key is complete and properly formatted');
    }

    if (!process.env.GOOGLE_PROJECT_ID) {
      diagnostics.issues.push('GOOGLE_PROJECT_ID is not set');
      diagnostics.recommendations.push('Add GOOGLE_PROJECT_ID to your .env.local file');
    }

    if (!process.env.DRIVE_FOLDER_MAIN) {
      diagnostics.issues.push('DRIVE_FOLDER_MAIN is not set');
      diagnostics.recommendations.push('Add your main Google Drive folder ID to .env.local');
    }

    const folderVars = [
      'DRIVE_FOLDER_WEDDING',
      'DRIVE_FOLDER_PRE_WEDDING', 
      'DRIVE_FOLDER_FASHION',
      'DRIVE_FOLDER_EVENTS'
    ];

    const missingFolders = folderVars.filter(folder => !process.env[folder]);
    if (missingFolders.length > 0) {
      diagnostics.issues.push(`Missing folder IDs: ${missingFolders.join(', ')}`);
      diagnostics.recommendations.push('Add all gallery folder IDs to your .env.local file');
    }

    // Check private key format
    if (process.env.GOOGLE_PRIVATE_KEY && !process.env.GOOGLE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY')) {
      diagnostics.issues.push('GOOGLE_PRIVATE_KEY format appears incorrect');
      diagnostics.recommendations.push('Ensure private key includes BEGIN/END markers and proper formatting');
    }

    // Overall status
    const status = diagnostics.issues.length === 0 ? 'HEALTHY' : 'NEEDS_ATTENTION';

    return NextResponse.json({
      status,
      ...diagnostics,
      nextSteps: diagnostics.issues.length === 0 ? 
        ['Test Google Drive connection at /api/test-drive'] :
        ['Fix the issues above', 'Restart the development server', 'Test again']
    });

  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
