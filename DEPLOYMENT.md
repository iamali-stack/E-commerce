# 🚀 Deployment Guide

This guide will help you deploy the E-commerce App to various platforms.

## 📋 Prerequisites

- Node.js (v16 or higher)
- Git
- GitHub account
- (Optional) Vercel/Netlify account for automatic deployments

## 🎯 Deployment Options

### 1. GitHub Pages (Free)

#### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository named `E-commerce-App`
2. Make sure the repository is public for free GitHub Pages hosting

#### Step 2: Push Your Code
```bash
# Add the remote repository
git remote add origin https://github.com/yourusername/E-commerce-App.git

# Push to GitHub
git push -u origin main
```

#### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "GitHub Actions"
5. The GitHub Actions workflow will automatically deploy your site

#### Step 4: Access Your Site
Your site will be available at: `https://yourusername.github.io/E-commerce-App`

### 2. Vercel (Recommended - Free)

#### Step 1: Connect to Vercel
1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project

#### Step 2: Configure Build Settings
- **Framework Preset**: Vite
- **Build Command**: `cd my-app && npm run build`
- **Output Directory**: `my-app/dist`
- **Install Command**: `cd my-app && npm install`

#### Step 3: Deploy
Click "Deploy" and Vercel will automatically build and deploy your site.

### 3. Netlify (Free)

#### Step 1: Connect to Netlify
1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub repository

#### Step 2: Configure Build Settings
- **Build command**: `cd my-app && npm run build`
- **Publish directory**: `my-app/dist`
- **Base directory**: (leave empty)

#### Step 3: Deploy
Click "Deploy site" and Netlify will build and deploy your application.

## 🔧 Environment Variables

If you need to configure environment variables:

### For Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add any required variables

### For Netlify:
1. Go to Site settings > Build & deploy > Environment
2. Add your environment variables

## 📱 Custom Domain (Optional)

### GitHub Pages:
1. Go to repository Settings > Pages
2. Add your custom domain in the "Custom domain" field
3. Update your DNS settings

### Vercel/Netlify:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## 🔄 Continuous Deployment

The project includes GitHub Actions workflow that automatically deploys on every push to the main branch.

### Manual Deployment
If you need to deploy manually:

```bash
# Build the project
cd my-app
npm run build

# The built files will be in my-app/dist/
```

## 🐛 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check if all dependencies are installed: `npm install`
   - Verify Node.js version: `node --version`
   - Check for syntax errors: `npm run lint`

2. **Routing Issues**
   - Make sure your hosting platform supports client-side routing
   - Configure redirects for SPA (Single Page Application)

3. **API Issues**
   - Verify the API endpoint is accessible
   - Check CORS settings if needed
   - Ensure environment variables are set correctly

### Vercel Configuration
The project includes a `vercel.json` file that handles:
- Build configuration
- SPA routing
- Asset caching

### Netlify Configuration
Create a `_redirects` file in the `my-app/public` directory:
```
/*    /index.html   200
```

## 📊 Performance Optimization

### Build Optimization
- The project uses Vite for fast builds
- Assets are automatically optimized
- Code splitting is enabled

### Runtime Optimization
- React Query for efficient data fetching
- Lazy loading for components
- Optimized images and assets

## 🔒 Security Considerations

- API keys should be stored as environment variables
- Never commit sensitive information to the repository
- Use HTTPS for all deployments
- Regularly update dependencies

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the platform-specific documentation
3. Check the project's GitHub Issues
4. Create a new issue with detailed information

---

Happy Deploying! 🎉 