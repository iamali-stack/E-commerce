import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext.jsx';
import { Link } from 'react-router-dom';

export default function Cart() {
  const {
    numOfCartItems,
    totalPrice,
    products,
    resetCart,
    clearCart,
    updateQuantity,
    removeFromCart
  } = useContext(CartContext);

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-12">
      {products && products.length > 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Cart Shop</h1>
            <Link to="/checkout">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                Check out
              </button>
            </Link>
          </div>

          {/* Summary */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg">
              <span className="text-gray-900">Total price: </span>
              <span className="text-green-600 font-semibold">{totalPrice}</span>
            </div>
            <div className="text-lg">
              <span className="text-gray-900">Total number of items: </span>
              <span className="text-green-600 font-semibold">{numOfCartItems}</span>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-lg p-6 mb-6">
            {products.map((product, index) => {
              const count = product.count;
              const productId = product.product._id;
              return (
                <div key={product.id}>
                  <div className="flex items-center justify-between py-4">
                    {/* Product Info */}
                    <div className="flex items-center gap-6">
                      <img
                        src={product?.product?.imageCover || "/placeholder.png"}
                        alt={product?.product?.title || "Product"}
                        width={120}
                        height={120}
                        className="rounded object-cover w-[120px] h-[120px]"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {product?.product?.title || "Product"}
                        </h3>
                        <p className="text-gray-600 mb-2">{product?.price || 0} EGP</p>
                        <button
                          onClick={() => removeFromCart(productId)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          <i className="fas fa-trash"></i> Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(productId, count + 1)}
                        className="w-8 h-8 border-2 border-green-500 text-green-600 rounded flex items-center justify-center hover:bg-green-50"
                      >
                        +
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{count}</span>
                      <button
                        onClick={() => updateQuantity(productId, count - 1)}
                        className="w-8 h-8 border-2 border-green-500 text-green-600 rounded flex items-center justify-center hover:bg-green-50"
                      >
                        -
                      </button>
                    </div>
                  </div>
                  {index < products.length - 1 && <hr className="border-gray-200" />}
                </div>
              );
            })}
          </div>

          {/* Clear Cart Button */}
          <div className="text-center">
            <button
              onClick={handleClearCart}
              className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-2 bg-transparent rounded"
            >
              Clear Your Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl text-gray-600">No products in cart</h2>
        </div>
      )}
    </div>
  );
}
