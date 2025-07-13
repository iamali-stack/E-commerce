import React, { useContext } from 'react'
import style from'./WishList.module.css'
import { CartContext } from '../Context/CartContext.jsx'
import { WishlistContext } from '../Context/WishlistContext.jsx'
import { toast } from 'react-hot-toast';

export default function WishList() {
  const { addtoCart } = useContext(CartContext);
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  async function handleAddToCart(product) {
    let response = await addtoCart(product.id);
    if (response.data.status === 'success') {
      toast.success('Added to cart!', {
        duration: 3000,
        position: 'top-right'
      });
      await removeFromWishlist(product.id);
    } else {
      toast.error('Failed to add product to cart');
    }
  }

  async function handleRemove(product) {
    await removeFromWishlist(product.id);
    toast('Removed from wishlist', { position: 'top-right' });
  }

  return (
    <>
      <div className="bg-gray-50 p-10 rounded-lg shadow-md max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-semibold mb-8">My wish List</h2>
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-6 rounded-b-lg border-b border-gray-300 mb-4">
              <div className="flex items-center">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-44 h-auto object-contain"
                />
                <div className="ml-6">
                  <h3 className="text-xl font-semibold">
                    {product.title}
                  </h3>
                  <p className="text-green-600 font-bold text-lg mt-2">{product.price} EGP</p>
                  <button onClick={() => handleRemove(product)} className="text-red-500 mt-2 flex items-center space-x-1">
                    <i className="fas fa-trash"></i>
                    <span>Remove</span>
                  </button>
                </div>
              </div>
              <button 
                onClick={() => handleAddToCart(product)}
                className="border border-green-500 text-black px-6 py-3 rounded-lg cursor-pointer ">
                add To Cart
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No items in wishlist.</div>
        )}
      </div>
    </>
  );
}
