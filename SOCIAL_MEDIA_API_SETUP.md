# 🔑 Social Media API Setup Guide

## 📋 Overview

Your Elinor Production website now fetches **real videos** from your YouTube channel and Instagram accounts. To enable this, you need to configure API keys for both platforms.

## 🎯 Current Status

- ✅ **Dummy videos removed** - No more placeholder content
- ✅ **Real API integration** - Fetches from YouTube and Instagram
- ⚠️ **API keys required** - Need configuration to show content

## 🔴 YouTube API Setup

### Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console:** https://console.cloud.google.com/
2. **Create or select a project**
3. **Enable YouTube Data API v3:**
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"

### Step 2: Create API Key

1. **Go to "APIs & Services" > "Credentials"**
2. **Click "Create Credentials" > "API Key"**
3. **Copy the generated API key**
4. **Restrict the key (recommended):**
   - Click on the key to edit
   - Under "API restrictions", select "YouTube Data API v3"
   - Save

### Step 3: Add to Environment

1. **Open `.env.local`**
2. **Replace `your_youtube_api_key_here` with your actual API key:**
   ```
   YOUTUBE_API_KEY=AIzaSyC_your_actual_api_key_here
   ```

## 📸 Instagram API Setup

### Step 1: Facebook Developers Setup

1. **Go to Facebook Developers:** https://developers.facebook.com/
2. **Create an app** or use existing
3. **Add Instagram Basic Display product**

### Step 2: Generate Access Token

1. **Go to Instagram Basic Display > Basic Display**
2. **Create Instagram App**
3. **Add Instagram Test User** (your Instagram account)
4. **Generate User Token:**
   - Click "Generate Token" next to your test user
   - Authorize the app
   - Copy the access token

### Step 3: Add to Environment

1. **Open `.env.local`**
2. **Replace `your_instagram_access_token_here` with your actual token:**
   ```
   INSTAGRAM_ACCESS_TOKEN=IGQVJYour_actual_access_token_here
   ```

## 🚀 Testing the Setup

### 1. Restart Development Server

```bash
npm run dev
```

### 2. Check API Status

Visit: http://localhost:3000/api/social-videos

You should see:
```json
{
  "success": true,
  "videos": [...],
  "apiStatus": {
    "youtube": "configured",
    "instagram": "configured"
  }
}
```

### 3. View Reels Page

Visit: http://localhost:3000/reels

You should see your real YouTube videos and Instagram content!

## 📊 What You'll Get

### YouTube Content:
- ✅ **All videos** from @elinorproduction channel
- ✅ **Real thumbnails** from YouTube
- ✅ **View counts** and durations
- ✅ **Automatic categorization** based on titles
- ✅ **Proper embed URLs** for playback

### Instagram Content:
- ✅ **Videos and reels** from your account
- ✅ **Real captions** as descriptions
- ✅ **Automatic categorization** based on captions
- ✅ **Direct links** to Instagram posts
- ✅ **Professional display** with platform badges

## 🎨 Automatic Categorization

Videos are automatically sorted into categories based on keywords:

### YouTube (Title Keywords):
- **Wedding:** wedding, marriage, bride, groom
- **Pre-Wedding:** pre-wedding, engagement, couple
- **Fashion:** fashion, model, portrait
- **Events:** event, corporate, party
- **Behind-Scenes:** behind, bts, making

### Instagram (Caption Keywords):
- **Wedding:** wedding, marriage
- **Pre-Wedding:** pre-wedding, engagement
- **Fashion:** fashion, model
- **Events:** event, party
- **Default:** instagram-reel

## 🔧 Troubleshooting

### No Videos Showing?

1. **Check API keys** in `.env.local`
2. **Restart development server**
3. **Check browser console** for errors
4. **Verify API endpoint:** http://localhost:3000/api/social-videos

### YouTube API Errors?

- **Quota exceeded:** YouTube API has daily limits
- **Invalid key:** Double-check your API key
- **Channel not found:** Verify @elinorproduction exists

### Instagram API Errors?

- **Token expired:** Instagram tokens expire, regenerate
- **Account not authorized:** Add your account as test user
- **Private account:** Make sure account is accessible

## 📈 API Limits

### YouTube Data API v3:
- **10,000 units/day** (free tier)
- **Each video fetch ≈ 3-5 units**
- **Sufficient for regular updates**

### Instagram Basic Display:
- **200 requests/hour** per user
- **No daily limit**
- **Tokens expire every 60 days**

## 🔄 Content Updates

- **Cache duration:** 30 minutes
- **Auto-refresh:** Content updates automatically
- **Manual refresh:** Restart server or wait for cache expiry

## 🎯 Next Steps

1. **Get your API keys** following the guides above
2. **Add them to `.env.local`**
3. **Restart the development server**
4. **Check your reels page** for real content
5. **Enjoy your live social media integration!**

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify API keys are correctly formatted
3. Ensure your social media accounts are accessible
4. Test the API endpoint directly

Your reels section will now show **real, live content** from your YouTube and Instagram accounts! 🎊
