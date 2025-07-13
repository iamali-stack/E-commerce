import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext(0);

export default function WishlistContextProvider(props) {
  const [wishlist, setWishlist] = useState([]);
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);

  // Get token dynamically
  const getHeaders = () => {
    const token = localStorage.getItem('usertoken');
    return { token };
  };

  const getWishlist = async () => {
    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { headers: getHeaders() }
      );
      setWishlist(response?.data?.data);
      setNumOfWishlistItems(response?.data?.count || response?.data?.data?.length || 0);
      return response;
    } catch (error) {
      return error;
    }
  };

  const addToWishlist = async (prodId) => {
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId: prodId },
        { headers: getHeaders() }
      );
      await getWishlist();
      return response;
    } catch (error) {
      return error;
    }
  };

  const removeFromWishlist = async (prodId) => {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,
        { headers: getHeaders() }
      );
      await getWishlist();
      return response;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('usertoken');
    if (token) {
      getWishlist();
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        numOfWishlistItems,
        getWishlist,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
} 