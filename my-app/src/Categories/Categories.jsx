import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

export default function Categories() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCategories() {
    setLoading(true);
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setData(data.data);
    setLoading(false);
  }

  async function handleCategoryClick(category) {
    setLoading(true);
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${category._id}/subcategories`);
    console.log(category._id)
    setSelectedCategory(category.name);
    setSubcategories(data.data); // <-- Save subcategories array to state
    console.log(category.name)
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {loading && (
          <Spinner />
       
       
      )}
 
        <>
          <div className="flex flex-wrap justify-center w-full md:w-3/3 mx-auto gap-6 py-10">
            {data.map((category) => (
              <div
                key={category._id}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden flex flex-col w-full md:w-1/2 lg:w-1/3 hover:shadow-[0_0_16px_rgba(34,197,94,0.3)] hover:border-green-400 transition-all duration-300 cursor-pointer"
                style={{ minWidth: '260px', maxWidth: '400px' }}
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover"
                />
                <div className="w-full py-4 flex justify-center items-center">
                  <h3 className="text-green-600 text-2xl font-semibold text-center">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div className="w-full flex flex-col items-center  py-8 ">
              <h1 className="text-green-600 text-3xl font-semibold mb-6">{selectedCategory} subcategories</h1>
              <div className="flex flex-wrap justify-center gap-4 w-full md:w-3/4">
                {subcategories.length > 0 ? (
                  subcategories.map((sub) => (
                    <div
                      key={sub._id}
                      className="  border border-gray-300 rounded-lg px-8 py-4 text-lg font-semibold text-gray-800 bg-white text-center min-w-[220px] mb-2  hover:shadow-[0_0_16px_rgba(34,197,94,0.3)] hover:border-green-400 transition-all duration-300 "
                    >
                      {sub.name}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-lg">No subcategories found.</div>
                )}
              </div>
            </div>
          )}
        </>
    
    </>
  );
}
