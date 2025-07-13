#!/bin/bash

# E-commerce App Deployment Script
echo "🚀 Starting E-commerce App deployment..."

# Check if we're in the right directory
if [ ! -d "my-app" ]; then
    echo "❌ Error: my-app directory not found. Please run this script from the project root."
    exit 1
fi

# Navigate to the app directory
cd my-app

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build files are in: my-app/dist/"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Push your code to GitHub: git push origin main"
    echo "2. Deploy to your preferred platform:"
    echo "   - Vercel: https://vercel.com"
    echo "   - Netlify: https://netlify.com"
    echo "   - GitHub Pages: Check repository settings"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi 