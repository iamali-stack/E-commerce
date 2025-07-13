import React, { useState, useEffect, useContext } from 'react'
import style from'./Products.module.css'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner.jsx'
import { CartContext } from '../Context/CartContext.jsx'
import { WishlistContext } from '../Context/WishlistContext.jsx'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export default function Products() {
  const [allProducts, setAllProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { addtoCart } = useContext(CartContext);
  const { wishlist, addToWishlist } = useContext(WishlistContext);

  async function addProductToCart(prodId) {
    try {
      let response = await addtoCart(prodId);
      if (response.data && response.data.status === 'success') {
        toast.success(response?.data?.message || 'Product added to cart successfully', {
          duration: 3000,
          position: 'top-right'
        });
      } else {
        toast.error('Failed to add product to cart');
        console.error('Add to cart failed:', response);
      }
    } catch (error) {
      toast.error('Failed to add product to cart');
      console.error('Add to cart error:', error);
    }
  }

  async function handleAddToWishlist(prodId) {
    let response = await addToWishlist(prodId);
    if (response.data.status === 'success') {
      toast.success('It has been successfully added to wishlist', {
        duration: 3000,
        position: 'top-right'
      });
    } else {
      toast.error('Failed to add product to wishlist');
    }
  }

  function getAllProducts() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/products')
      .then((response) => {
        setAllProducts(response?.data?.data);
      })
      .catch(() => {
        console.log('error');
      });
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const filteredProducts = allProducts?.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <>
      <div className="w-full flex justify-center p-10">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
          <input
            type="text"
            placeholder="search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
      </div>

      {allProducts ? (
        <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl overflow-hidden border border-transparent hover:border-green-400 shadow-none hover:shadow-[0_0_10px_rgba(34,197,94,0.4)] transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <Link to={`productdetails/${product.id}/${product.category.name}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </div>

                <div className="p-4 pb-16 relative">
                  <Link to={`productdetails/${product.id}/${product.category.name}`}>
                    <span className="text-green-600 text-sm font-medium">{product.category.name}</span>
                    <h3 className="text-gray-900 font-semibold mt-1 mb-2">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-bold">{product.price} EGP</span>
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-star text-yellow-400 text-sm"></i>
                        <span className="text-gray-600 text-sm">{product.ratingsAverage}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Heart icon */}
                  <button
                    className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center z-10"
                    onClick={() => handleAddToWishlist(product.id)}
                  >
                    <i className={`fas fa-heart text-xl transition-colors ${wishlist?.some(item => item.id === product.id) ? 'text-red-500' : 'text-gray-800 hover:text-red-500'}`}></i>
                  </button>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="absolute bottom-4 left-4 right-14 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-20"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Add
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">No products found.</div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
