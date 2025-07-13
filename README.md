# 🛒 E-commerce App

A modern, responsive e-commerce web application built with React and Vite, featuring a complete shopping experience with authentication, product management, cart functionality, and more.

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login**: Secure authentication system with form validation
- **Password Recovery**: Complete password reset flow with email verification
- **Protected Routes**: Secure access to user-specific features
- **User Context**: Global state management for user sessions

### 🛍️ Shopping Experience
- **Product Catalog**: Browse products with search and filtering capabilities
- **Product Details**: Detailed product pages with images, descriptions, and reviews
- **Shopping Cart**: Add/remove items with quantity management
- **Wishlist**: Save favorite products for later
- **Categories & Brands**: Organized product browsing by categories and brands

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Image Sliders**: Dynamic product showcases and category displays
- **Loading States**: Spinner components for better UX
- **Toast Notifications**: Real-time feedback for user actions

### 🛒 Checkout & Payment
- **Shopping Cart Management**: Add, remove, and update cart items
- **Checkout Process**: Streamlined checkout experience
- **Order Management**: Track and manage orders

## 🚀 Technologies Used

### Frontend
- **React 19.1.0** - Modern React with latest features
- **Vite 6.3.5** - Fast build tool and development server
- **React Router DOM 7.6.2** - Client-side routing
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **Formik 2.4.6** - Form handling and validation
- **Yup 1.6.1** - Schema validation
- **Axios 1.10.0** - HTTP client for API calls
- **React Hot Toast 2.5.2** - Toast notifications
- **React Slick 0.30.3** - Carousel/slider components
- **FontAwesome** - Icon library
- **React Query 5.81.5** - Server state management

### Development Tools
- **ESLint 9.25.0** - Code linting
- **TypeScript** - Type checking for React components

## 📁 Project Structure

```
src/
├── Auth/                 # Authentication components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ForgetPassword.jsx
│   ├── ResetPassword.jsx
│   └── VerifyResetCode.jsx
├── Context/              # React Context providers
│   ├── UserContext.jsx
│   ├── CartContext.jsx
│   └── WishlistContext.jsx
├── Components/           # Reusable components
│   ├── Navbar/
│   ├── Spinner/
│   └── Layout/
├── Pages/                # Main application pages
│   ├── Home/
│   ├── Products/
│   ├── ProductDetails/
│   ├── Cart/
│   ├── Checkout/
│   ├── Categories/
│   ├── Brands/
│   └── WishList/
├── Assets/               # Static assets
│   └── images/
└── App.jsx              # Main application component
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/E-commerce-App.git
   cd E-commerce-App/my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The application integrates with the E-commerce API from RouteMisr:
- **Base URL**: `https://ecommerce.routemisr.com/api/v1`
- **Features**: Product management, user authentication, cart operations

## 🎯 Key Features in Detail

### Authentication Flow
- Secure login/register with form validation
- JWT token-based authentication
- Protected routes for authenticated users
- Password reset functionality with email verification

### Product Management
- Dynamic product loading from API
- Search functionality with real-time filtering
- Category and brand-based organization
- Product details with images and specifications

### Shopping Cart
- Add/remove products with quantity control
- Persistent cart state across sessions
- Real-time cart updates
- Checkout process integration

### User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user feedback

### Runtime Optimization
- React Query for efficient data fetching
- Lazy loading for components
- Optimized images and assets

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Deploy automatically on push to main branch

### Environment Variables
Create a `.env` file in the root directory if needed:
```env
VITE_API_BASE_URL=https://ecommerce.routemisr.com/api/v1
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- [RouteMisr](https://ecommerce.routemisr.com/) for providing the API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React Query](https://tanstack.com/query) for server state management
- [FontAwesome](https://fontawesome.com/) for the icon library

---

⭐ If you found this project helpful, please give it a star! 