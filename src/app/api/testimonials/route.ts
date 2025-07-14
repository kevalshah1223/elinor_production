import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Google Sheets configuration
const SPREADSHEET_ID = '1mLmIrhPXHpVXK_-AEyaGZr6GxvtoRgrLDoMlBSUcLe8';
const RANGE = 'A:F'; // Get all data from columns A to F

interface Testimonial {
  id: string;
  name: string;
  event: string;
  rating: number;
  testimonial: string;
  date: string;
}

async function getGoogleSheetsClient() {
  try {
    const credentials = {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error creating Google Sheets client:', error);
    throw error;
  }
}

async function fetchTestimonialsFromSheets(): Promise<Testimonial[]> {
  try {
    console.log('📊 Fetching testimonials from Google Sheets...');
    
    const sheets = await getGoogleSheetsClient();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;

    console.log(`📊 Google Sheets response: ${rows?.length || 0} rows found`);
    if (rows && rows.length > 0) {
      console.log('📋 First row (headers):', rows[0]);
      console.log('📋 Second row (sample data):', rows[1]);
    }

    if (!rows || rows.length <= 1) {
      console.warn('⚠️ No testimonial data found in Google Sheets (empty or only headers)');
      return [];
    }

    // Skip header row and process data
    const testimonials: Testimonial[] = [];
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      
      // Expected columns: Name, Event, Rating, Testimonial, Date, (Optional: Status)
      if (row.length >= 5 && row[0] && row[3]) { // At least name and testimonial required
        testimonials.push({
          id: `testimonial-${i}`,
          name: row[0] || 'Anonymous',
          event: row[1] || 'Photography Service',
          rating: parseInt(row[2]) || 5,
          testimonial: row[3] || '',
          date: row[4] || new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })
        });
      }
    }

    console.log(`✅ Loaded ${testimonials.length} testimonials from Google Sheets`);
    return testimonials;

  } catch (error) {
    console.error('❌ Error fetching testimonials from Google Sheets:', error);
    return [];
  }
}

// Fallback testimonials if Google Sheets is not accessible
function getFallbackTestimonials(): Testimonial[] {
  return [
    {
      id: 'fallback-1',
      name: 'Priya & Arjun',
      event: 'Wedding Photography',
      rating: 5,
      testimonial: 'Elinor Production captured our wedding day perfectly! Every moment was beautifully documented, and the team was so professional and friendly. We couldn\'t be happier with our photos and videos.',
      date: 'December 2023'
    },
    {
      id: 'fallback-2',
      name: 'Sneha & Vikram',
      event: 'Pre-Wedding Shoot',
      rating: 5,
      testimonial: 'Our pre-wedding shoot was absolutely magical! The photographer understood our vision and created stunning images that we will treasure forever. Highly recommended!',
      date: 'November 2023'
    },
    {
      id: 'fallback-3',
      name: 'Ananya Sharma',
      event: 'Fashion Photography',
      rating: 5,
      testimonial: 'Working with Elinor Production for my fashion portfolio was an incredible experience. The creativity and attention to detail exceeded my expectations. The final images are absolutely stunning!',
      date: 'October 2023'
    },
    {
      id: 'fallback-4',
      name: 'Rajesh Kumar',
      event: 'Corporate Event',
      rating: 5,
      testimonial: 'Elinor Production covered our annual corporate event flawlessly. They captured all the important moments and delivered high-quality photos promptly. Very professional service!',
      date: 'September 2023'
    }
  ];
}

export async function GET() {
  try {
    console.log('🎭 Loading testimonials...');

    // Try to fetch from Google Sheets first
    let testimonials = await fetchTestimonialsFromSheets();

    // If no testimonials from sheets, use fallback
    if (testimonials.length === 0) {
      console.log('📝 Using fallback testimonials');
      testimonials = getFallbackTestimonials();
    }

    // Sort by date (newest first) - attempt to parse dates
    testimonials.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    const response = NextResponse.json({
      success: true,
      testimonials,
      total: testimonials.length,
      source: testimonials.length > 0 && testimonials[0].id.startsWith('fallback') ? 'fallback' : 'google-sheets',
      lastUpdated: new Date().toISOString(),
      spreadsheetId: SPREADSHEET_ID
    });

    // Cache for 30 minutes
    response.headers.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');

    return response;
  } catch (error) {
    console.error('❌ Error loading testimonials:', error);
    
    // Return fallback testimonials on error
    const fallbackTestimonials = getFallbackTestimonials();
    
    return NextResponse.json({
      success: false,
      error: 'Failed to load testimonials',
      testimonials: fallbackTestimonials,
      total: fallbackTestimonials.length,
      source: 'fallback-error',
      lastUpdated: new Date().toISOString()
    }, { status: 500 });
  }
}
