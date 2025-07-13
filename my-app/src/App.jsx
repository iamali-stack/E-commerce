import './App.css'
import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import Login from './Auth/Login.jsx'
import Home from './Home/Home.jsx'
import Products from './Products/Products.jsx'
import Cart from './Cart/Cart.jsx'
import Brands from './Brands/Brands.jsx'
import Register from './Register/Register.jsx'
import Categories from './Categories/Categories.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import Productdetails from './ProductDetails/ProductDetails.jsx'
import ProtectRoute from './Protectroute/ProtectRoute.jsx'
import Checkout from './Checkout/Checkout.jsx'
import toast, { Toaster } from 'react-hot-toast';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import{ QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WishList from './WishList/WishList.jsx'
import WishlistContextProvider from './Context/WishlistContext.jsx'
import VerifyResetCode from './Auth/VerifyResetCode.jsx'
import ResetPassword from './Auth/ResetPassword.jsx'
import ForgetPassword from './Auth/ForgetPassword.jsx'
import NotFound from './NotFound.jsx'

const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <ProtectRoute><Home/></ProtectRoute> },
        { path: 'home', element: <ProtectRoute><Home /></ProtectRoute> },
        { path: 'productdetails/:id/:category', element: <ProtectRoute><Productdetails/></ProtectRoute> },
        { path: 'products', element: <ProtectRoute><Products /></ProtectRoute> },
        { path: 'checkout', element: <ProtectRoute><Checkout /></ProtectRoute> },
        { path: 'categories', element: <ProtectRoute><Categories /></ProtectRoute> },
        { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> },
        { path: 'brands', element: <ProtectRoute><Brands /></ProtectRoute> },
        { path: 'wishlist', element: <ProtectRoute><WishList /></ProtectRoute> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'verify-reset-code', element: <VerifyResetCode /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'forget-password', element: <ForgetPassword /> },

      ]
    },
    { path: '*', element: <NotFound /> } // <-- 404 for top-level routes
  ], {
    basename: '/E-commerce'
  });

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <RouterProvider router={router}/>
            <Toaster/>
            <ReactQueryDevtools initialIsOpen={false} />
          </CartContextProvider>
        </WishlistContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );

}

export default App;
