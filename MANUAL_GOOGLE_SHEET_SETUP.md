# 📊 Manual Google Sheet Setup for Testimonials

## 🎯 Quick Setup Instructions

### **Step 1: Open Your Google Sheet**
**URL:** https://docs.google.com/spreadsheets/d/1mLmIrhPXHpVXK_-AEyaGZr6GxvtoRgrLDoMlBSUcLe8/edit

### **Step 2: Set Up Column Headers (Row 1)**
Add these exact headers in Row 1:

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| **Name** | **Event** | **Rating** | **Testimonial** | **Date** |

### **Step 3: Add Sample Data (Rows 2-7)**
Copy and paste this data into your sheet:

**Row 2:**
- A2: `Priya & Arjun`
- B2: `Wedding Photography`
- C2: `5`
- D2: `Elinor Production captured our wedding day perfectly! Every moment was beautifully documented, and the team was so professional and friendly. We couldn't be happier with our photos and videos.`
- E2: `December 2023`

**Row 3:**
- A3: `Sneha & Vikram`
- B3: `Pre-Wedding Shoot`
- C3: `5`
- D3: `Our pre-wedding shoot was absolutely magical! The photographer understood our vision and created stunning images that we will treasure forever. Highly recommended!`
- E3: `November 2023`

**Row 4:**
- A4: `Ananya Sharma`
- B4: `Fashion Photography`
- C4: `5`
- D4: `Working with Elinor Production for my fashion portfolio was an incredible experience. The creativity and attention to detail exceeded my expectations. The final images are absolutely stunning!`
- E4: `October 2023`

**Row 5:**
- A5: `Rajesh Kumar`
- B5: `Corporate Event`
- C5: `5`
- D5: `Elinor Production covered our annual corporate event flawlessly. They captured all the important moments and delivered high-quality photos promptly. Very professional service!`
- E5: `September 2023`

**Row 6:**
- A6: `Meera & Karthik`
- B6: `Engagement Ceremony`
- C6: `5`
- D6: `The engagement photos turned out beyond our expectations! The team captured the joy and emotions of our special day beautifully. Thank you for making our memories so precious!`
- E6: `August 2023`

**Row 7:**
- A7: `Kavya Reddy`
- B7: `Portfolio Shoot`
- C7: `5`
- D7: `Amazing experience working with Elinor Production for my modeling portfolio. The photographer was very professional and helped me feel comfortable throughout the shoot. Love the results!`
- E7: `July 2023`

## 📋 Column Specifications

### **Column A - Name (Required)**
- **Format:** Client name or couple names
- **Examples:** 
  - `Priya & Arjun`
  - `Ananya Sharma`
  - `Mr. & Mrs. Patel`

### **Column B - Event (Required)**
- **Format:** Type of photography service
- **Examples:**
  - `Wedding Photography`
  - `Pre-Wedding Shoot`
  - `Fashion Photography`
  - `Corporate Event`
  - `Engagement Ceremony`
  - `Portfolio Shoot`

### **Column C - Rating (Required)**
- **Format:** Number from 1 to 5
- **Examples:** `5`, `4`, `3`
- **Note:** Use numbers only, not stars

### **Column D - Testimonial (Required)**
- **Format:** Full testimonial text
- **Length:** Any length (will be displayed in full)
- **Note:** Use proper punctuation and grammar

### **Column E - Date (Required)**
- **Format:** Month Year or any readable date format
- **Examples:**
  - `December 2023`
  - `Nov 2023`
  - `2023-12-15`
  - `15th Dec 2023`

## 🎨 Optional Formatting

### **Make Headers Bold:**
1. Select Row 1 (A1:E1)
2. Click Bold (B) button
3. Optionally change background color to dark gray

### **Adjust Column Widths:**
- **Name (A):** ~150px
- **Event (B):** ~150px  
- **Rating (C):** ~80px
- **Testimonial (D):** ~400px (wider for long text)
- **Date (E):** ~120px

## 🔄 How It Works

### **Automatic Updates:**
- **Save the sheet** - Changes are automatically saved
- **Website updates** - Testimonials refresh every 30 minutes
- **No restart needed** - Changes appear automatically

### **Data Validation:**
- **Required fields:** Name and Testimonial must be filled
- **Rating conversion:** Numbers 1-5 become star ratings
- **Empty rows:** Automatically skipped
- **Error handling:** Invalid data is ignored gracefully

## 📊 Testing Your Setup

### **1. Save Your Google Sheet**
After adding the data, make sure to save (Ctrl+S or Cmd+S)

### **2. Test the API**
Visit: http://localhost:3000/api/testimonials
- Should show `"source": "google-sheets"`
- Should display your testimonials data

### **3. Check the Website**
Visit: http://localhost:3000/testimonials
- Should display your real testimonials
- Should show star ratings
- Should have navigation if multiple testimonials

## 🎯 Adding New Testimonials

### **For Each New Testimonial:**
1. **Add a new row** at the bottom
2. **Fill in all 5 columns** (Name, Event, Rating, Testimonial, Date)
3. **Save the sheet**
4. **Wait up to 30 minutes** for website to update (or restart server for immediate update)

### **Example New Row:**
```
Row 8:
A8: Ravi & Sita
B8: Wedding Videography  
C8: 5
D8: The wedding video created by Elinor Production is absolutely cinematic! They captured our love story beautifully and created a masterpiece that we watch over and over again.
E8: January 2024
```

## 🔧 Troubleshooting

### **Testimonials Not Showing?**
1. **Check Google Sheet permissions** - Make sure it's shared with the service account
2. **Verify data format** - Ensure all required columns are filled
3. **Check API endpoint** - Visit `/api/testimonials` to see raw data
4. **Wait for cache** - Changes take up to 30 minutes to appear

### **API Shows Fallback Data?**
- **Sheet is empty** - Add data following the format above
- **Permission issues** - Check service account access
- **Wrong sheet ID** - Verify the spreadsheet URL

### **Stars Not Displaying?**
- **Use numbers only** in Rating column (1, 2, 3, 4, 5)
- **No text** like "5 stars" - just the number

## ✅ Success Checklist

- [ ] Headers added in Row 1 (Name, Event, Rating, Testimonial, Date)
- [ ] Sample data added in Rows 2-7
- [ ] All required columns filled
- [ ] Rating column uses numbers 1-5
- [ ] Google Sheet saved
- [ ] API endpoint shows real data
- [ ] Website displays testimonials correctly

Your testimonials system is now ready to use! 🎊
