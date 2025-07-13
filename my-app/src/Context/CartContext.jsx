import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(0);

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  // Get token dynamically
  const getHeaders = () => {
    const token = localStorage.getItem('usertoken');
    return { token };
  };

  function resetCart() {
    setCartId(null);
    setTotalPrice(0);
    setProducts(null);
    setNumOfCartItems(0);
  }

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { headers: getHeaders() }
      );
      resetCart();
      return response;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return error;
    }
  };

  const addtoCart = async (prodId) => {
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId: prodId },
        { headers: getHeaders() }
      );
      await getUserCartItems();
      return response;
    } catch (error) {
      return error;
    }
  };

  const getUserCartItems = async () => {
    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { headers: getHeaders() }
      );
      setCartId(response?.data?.cartId);
      setTotalPrice(response?.data?.data?.totalCartPrice);
      setProducts(response?.data?.data?.products);
      setNumOfCartItems(response?.data?.numOfCartItems);
      return response;
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const updateQuantity = async (productId, newCount) => {
    if (newCount < 1) return await removeFromCart(productId);
    try {
      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers: getHeaders() }
      );
      await getUserCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: getHeaders() }
      );
      await getUserCartItems();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('usertoken');
    if (token) {
      getUserCartItems();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        addtoCart,
        cartId,
        totalPrice,
        products,
        numOfCartItems,
        resetCart,
        clearCart,
        updateQuantity,
        removeFromCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
