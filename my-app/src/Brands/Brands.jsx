import { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../Spinner/Spinner';
export default function Brands() {
  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }
  let { data, isLoading, error } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands
  });

  // The API returns data in data.data, so we need to access it accordingly
  const brands = data?.data?.data || [];

    if (isLoading){
      return <Spinner />
    } 
    if (error) return <div>Error fetching brands</div>;

    return (
      <>
      <h1 className='text-4xl font-semibold mb-5 text-center mt-7 text-green-600'>All Brands</h1>
      <div className=' max-w-8xl flex gap-y-8 mt-10 mb-10 flex-wrap justify-center mx-auto'>
        {brands.map((brand) => (
        <div key={brand._id} className="me-6 w-full md:w-1/3 lg:w-1/4 xl:w-1/5 border border-gray-300 rounded-lg bg-white text-center p-6 hover:shadow-sm hover:shadow-green-500 hover:scale-105 transition-transform duration-100 hover:border-green-300  transition-shadow duration-500">
          <div className="product p-5">
          <img src={brand.image} alt={brand.name} />
          <h3 className='text-lg font-bold '>
            {brand.slug.charAt(0).toUpperCase() + brand.slug.slice(1)}
          </h3>
          </div>
        </div>
        ))}
      </div>
      </>
    );
}
