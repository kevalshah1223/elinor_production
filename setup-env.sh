#!/bin/bash

# Elinor Production - Environment Setup Script
# This script safely sets up your local environment without exposing secrets

echo "🎬 Elinor Production - Environment Setup"
echo "========================================"
echo ""

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local already exists!"
    echo "📊 Checking system status..."
    
    # Test the setup
    if command -v curl &> /dev/null; then
        echo "🔍 Testing Google Drive connection..."
        curl -s http://localhost:3000/api/diagnose | grep -q "HEALTHY" && echo "✅ System is HEALTHY!" || echo "⚠️  System needs attention"
    fi
    
    echo ""
    echo "🚀 Your environment is ready!"
    echo "   Visit: http://localhost:3000/setup for detailed status"
    exit 0
fi

echo "📋 Setting up environment variables..."
echo ""

# Check if Vercel CLI is available
if command -v vercel &> /dev/null || command -v npx &> /dev/null; then
    echo "🔧 Option 1: Pull from Vercel (Recommended)"
    echo "   Run: npx vercel env pull .env.local"
    echo ""
fi

echo "🔧 Option 2: Manual Setup"
echo "   1. Copy .env.example to .env.local"
echo "   2. Fill in your Google Drive API credentials"
echo "   3. Add your folder IDs"
echo ""

echo "📖 Option 3: Follow Setup Guide"
echo "   Open: GOOGLE_DRIVE_SETUP.md"
echo ""

echo "⚠️  SECURITY REMINDER:"
echo "   Never commit .env.local to Git!"
echo "   It contains sensitive API keys and credentials."
echo ""

# Check if .env.example exists
if [ -f ".env.example" ]; then
    echo "📄 Template available: .env.example"
    echo ""
    read -p "🤔 Copy .env.example to .env.local? (y/N): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp .env.example .env.local
        echo "✅ Created .env.local from template"
        echo "📝 Please edit .env.local with your actual credentials"
        echo ""
        echo "🔗 Useful links:"
        echo "   • Google Cloud Console: https://console.cloud.google.com/"
        echo "   • Setup Guide: ./GOOGLE_DRIVE_SETUP.md"
        echo "   • System Status: http://localhost:3000/setup"
    fi
else
    echo "❌ .env.example not found"
    echo "   Please create it first or pull from Vercel"
fi

echo ""
echo "🎯 Next Steps:"
echo "   1. Configure your environment variables"
echo "   2. Start the dev server: npm run dev"
echo "   3. Check status: http://localhost:3000/setup"
echo ""
echo "✨ Happy coding!"
