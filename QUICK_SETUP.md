# 🚀 Quick Environment Setup

## If you see "Failed to fetch images" error:

### **Method 1: Vercel CLI (30 seconds)**
```bash
# Install Vercel CLI (if not installed)
npm install vercel

# Pull environment variables from Vercel
npx vercel env pull .env.local

# Restart dev server
npm run dev
```

### **Method 2: Run Setup Script**
```bash
# Make executable and run
chmod +x setup-env.sh
./setup-env.sh
```

### **Method 3: Manual Copy**
```bash
# Copy template
cp .env.example .env.local

# Edit with your credentials
nano .env.local  # or use your preferred editor
```

## 🔍 Check Status
- **Diagnostics**: http://localhost:3000/api/diagnose
- **Setup Page**: http://localhost:3000/setup
- **Test Drive**: http://localhost:3000/api/test-drive

## ⚠️ Security Reminder
- **NEVER** commit `.env.local` to Git
- It contains sensitive API keys and credentials
- Use Vercel CLI to sync environment variables safely

## 🆘 Need Help?
1. Check `GOOGLE_DRIVE_SETUP.md` for detailed instructions
2. Visit `/setup` page for system diagnostics
3. Ensure all environment variables are set correctly

---
*This setup ensures your Google Drive API works without exposing secrets to GitHub.*
