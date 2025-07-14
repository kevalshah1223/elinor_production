# 📊 Google Sheets Testimonials Setup Guide

## 📋 Overview

Your testimonials section now integrates with Google Sheets, allowing you to manage testimonials through a simple spreadsheet interface. The system automatically fetches and displays testimonials from your Google Sheet.

## 🔗 Google Sheet Structure

**Your Google Sheet:** https://docs.google.com/spreadsheets/d/1mLmIrhPXHpVXK_-AEyaGZr6GxvtoRgrLDoMlBSUcLe8/edit?usp=sharing

### Required Columns (Row 1 - Headers):
| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| Name | Event | Rating | Testimonial | Date | Status |

### Column Details:
- **Name** (A): Client name (e.g., "Priya & Arjun", "Ananya Sharma")
- **Event** (B): Type of service (e.g., "Wedding Photography", "Fashion Shoot")
- **Rating** (C): Number 1-5 (e.g., 5)
- **Testimonial** (D): The actual testimonial text
- **Date** (E): Date format (e.g., "December 2023", "Nov 2023")
- **Status** (F): Optional - for internal tracking

### Example Data:
```
Name                | Event              | Rating | Testimonial                                    | Date         | Status
Priya & Arjun      | Wedding Photography| 5      | Amazing work! Captured our day perfectly...   | December 2023| Published
Sneha Sharma       | Fashion Shoot      | 5      | Professional and creative photographer...      | November 2023| Published
```

## 🔑 Google Sheets API Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the Google Sheets API

### Step 2: Create Service Account
1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name it "testimonials-reader" or similar
4. Grant "Viewer" role
5. Create and download JSON key file

### Step 3: Share Google Sheet
1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (from JSON file)
4. Give "Viewer" permissions

### Step 4: Configure Environment Variables
Add to your `.env.local`:
```env
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID=your-project-id
```

## 🎯 How It Works

### Automatic Data Fetching:
1. **API Endpoint:** `/api/testimonials`
2. **Refresh Rate:** Every 30 minutes (cached)
3. **Fallback:** Shows sample testimonials if Google Sheets unavailable
4. **Error Handling:** Graceful fallback with retry option

### Display Features:
- ✅ **No Images Required** - Clean text-only display
- ✅ **Star Ratings** - Visual 5-star rating system
- ✅ **Responsive Design** - Works on all devices
- ✅ **Navigation** - Previous/Next buttons and dots
- ✅ **Loading States** - Professional loading indicators

## 📝 Adding New Testimonials

### Method 1: Direct Google Sheets Editing
1. Open your Google Sheet
2. Add new row with testimonial data
3. Save the sheet
4. Testimonials update automatically within 30 minutes

### Method 2: Form Integration (Optional)
You can create a Google Form that feeds into the same sheet:
1. Create Google Form with same fields
2. Link responses to your testimonials sheet
3. Review and approve before making visible

## 🎨 Customization Options

### Rating Display:
- Shows 1-5 stars based on rating column
- Golden star color for filled stars
- Gray for empty stars

### Date Formatting:
- Accepts various date formats
- Displays as provided in sheet
- Sorts by date (newest first)

### Content Filtering:
- Only shows rows with Name and Testimonial
- Skips empty rows automatically
- Handles missing data gracefully

## 🔧 Troubleshooting

### No Testimonials Showing?
1. **Check Google Sheets API credentials**
2. **Verify sheet sharing permissions**
3. **Ensure sheet has data in correct format**
4. **Check browser console for errors**

### API Errors?
1. **Service account email** must have access to sheet
2. **Private key** must be properly formatted in .env
3. **Project ID** must match Google Cloud project

### Sheet Not Updating?
1. **Cache duration** is 30 minutes
2. **Restart development server** to clear cache
3. **Check API endpoint** directly: `/api/testimonials`

## 📊 Current Status

**Without Google Sheets API:**
- Shows fallback testimonials
- Professional display maintained
- No functionality lost

**With Google Sheets API:**
- Live data from your sheet
- Automatic updates
- Real client testimonials

## 🚀 Benefits

### For You:
- ✅ **Easy Management** - Edit testimonials in familiar spreadsheet
- ✅ **No Code Changes** - Add/edit without touching website
- ✅ **Team Collaboration** - Multiple people can manage testimonials
- ✅ **Backup & History** - Google Sheets version history

### For Clients:
- ✅ **Real Testimonials** - Authentic client feedback
- ✅ **Professional Display** - Clean, image-free design
- ✅ **Fast Loading** - No heavy images to load
- ✅ **Mobile Friendly** - Perfect on all devices

## 📈 Next Steps

1. **Set up Google Sheets API** following the guide above
2. **Add your testimonials** to the Google Sheet
3. **Test the integration** by visiting `/api/testimonials`
4. **Customize the display** if needed
5. **Share the sheet** with team members for collaborative management

Your testimonials section is now dynamic and easy to manage! 🎊
