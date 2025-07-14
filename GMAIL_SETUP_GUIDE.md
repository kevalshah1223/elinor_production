# 📧 Gmail SMTP Setup Guide for Contact Form

## 🎯 Overview

Your contact form now sends emails directly to **elinorproduction@gmail.com** when visitors submit the form. The email field has been removed from the form as requested.

## 🔧 Gmail App Password Setup

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the setup process to enable 2FA

### Step 2: Generate App Password
1. Go back to "Security" settings
2. Under "Signing in to Google", click "App passwords"
3. Select "Mail" as the app
4. Select "Other (Custom name)" as the device
5. Enter "Elinor Production Website" as the name
6. Click "Generate"
7. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 3: Configure Environment Variables
Update your `.env.local` file:

```env
# Gmail SMTP Configuration for Contact Form
GMAIL_USER=elinorproduction@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Important:** 
- Use the actual Gmail address that will send the emails
- Use the 16-character app password (remove spaces)
- Keep this information secure and never commit to version control

## 📝 Contact Form Changes

### ✅ What's Updated:

**Removed:**
- ❌ **Email field** - No longer required from visitors
- ❌ **Email validation** - Simplified form validation

**Enhanced:**
- ✅ **Direct email sending** - Messages go straight to elinorproduction@gmail.com
- ✅ **Professional email format** - HTML and text versions
- ✅ **Error handling** - Proper feedback for users
- ✅ **Form validation** - Name and message are required

### 📋 Current Form Fields:
1. **Full Name** (Required)
2. **Phone Number** (Optional)
3. **Event Type** (Optional dropdown)
4. **Message** (Required)

## 📧 Email Format

When someone submits the contact form, you'll receive an email like this:

**Subject:** `New Contact Form Submission - [Name]`

**Content:**
```
New Contact Form Submission from Elinor Production Website

Name: John Doe
Phone: +91 98765 43210
Event Type: Wedding Photography

Message:
Hi, I'm interested in booking a wedding photography session for December 2024. 
Could you please share your packages and availability?

---
This email was sent from the Elinor Production contact form.
Sent at: 11/7/2025, 3:30:00 PM
```

## 🎨 Email Design Features

### HTML Email Template:
- **Professional header** with Elinor Production branding
- **Clean layout** with proper spacing and typography
- **Highlighted message** section for easy reading
- **Contact details** clearly organized
- **Timestamp** for reference

### Text Version:
- **Plain text fallback** for email clients that don't support HTML
- **All information preserved** in readable format

## 🔒 Security Features

### Email Validation:
- **Server-side validation** for required fields
- **Sanitized input** to prevent injection attacks
- **Rate limiting** (can be added if needed)

### Error Handling:
- **Graceful failures** with user-friendly messages
- **Server logging** for debugging
- **Fallback options** if email service is unavailable

## 🚀 Testing the Contact Form

### Test Submission:
1. Go to: http://localhost:3000/contact
2. Fill out the form:
   - **Name:** Test User
   - **Phone:** +91 98765 43210
   - **Event Type:** Wedding Photography
   - **Message:** This is a test message from the contact form.
3. Click "Send Message"
4. Check elinorproduction@gmail.com for the email

### Expected Behavior:
- ✅ Form shows loading state while sending
- ✅ Success message appears after sending
- ✅ Form resets to empty state
- ✅ Email arrives at elinorproduction@gmail.com within seconds

## 🛠️ Troubleshooting

### Email Not Sending?
1. **Check Gmail credentials** in `.env.local`
2. **Verify app password** is correct (16 characters, no spaces)
3. **Ensure 2FA is enabled** on the Gmail account
4. **Check server logs** for error messages

### Form Errors?
1. **Required fields** - Name and Message must be filled
2. **Network issues** - Check internet connection
3. **Server errors** - Check console for API errors

### Gmail Issues?
1. **App password expired** - Generate a new one
2. **Account locked** - Check Gmail security settings
3. **SMTP blocked** - Ensure Gmail allows less secure apps (if needed)

## 📊 Current Status

**Contact Form:** http://localhost:3000/contact
- ✅ **Email field removed** - Simplified form
- ✅ **Direct email sending** - To elinorproduction@gmail.com
- ✅ **Professional design** - Clean, modern interface
- ✅ **Mobile responsive** - Works on all devices
- ✅ **Error handling** - User-friendly feedback

**API Endpoint:** `/api/contact`
- ✅ **Nodemailer integration** - Professional email sending
- ✅ **Gmail SMTP** - Reliable delivery
- ✅ **HTML & Text formats** - Compatible with all email clients
- ✅ **Input validation** - Secure and reliable

## 🎯 Benefits

### For You:
- ✅ **Direct emails** - No third-party services needed
- ✅ **Professional format** - Easy to read and respond
- ✅ **All contact info** - Name, phone, event type, message
- ✅ **Timestamp tracking** - Know when inquiries come in

### For Clients:
- ✅ **Simplified form** - No email required
- ✅ **Quick submission** - Fewer fields to fill
- ✅ **Instant feedback** - Success/error messages
- ✅ **Mobile friendly** - Easy to use on any device

Your contact form is now streamlined and sends emails directly to elinorproduction@gmail.com! 📧✨
