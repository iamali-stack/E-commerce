import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';


export default function Prouctdetails() {
    let {id,category}=useParams()
    console.log("category is" ,category)
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
   

  const [productDetails, setProductDetails] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(null)
  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/`).then((data) => {
        console.log("allprod",data.data);
        console.log("category is",category);
        
   
        
        let related = data.data.data.filter((prod) => 
          {return prod.category?.name === category;
        });
        console.log("related is", related);
        setRelatedProducts(related);

      }).catch((error) => {
        console.log('error', error);
      });
  }

  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((response) => {
      console.log(response.data);
      setProductDetails(response?.data);
    }).catch((error) => {
      console.log('error');
    });
  }
useEffect(() => {
    getProductDetails();
    
    getAllProducts();
},[id])
  return (
    <>
    {productDetails? <div className='md:w-full flex flex-wrap items-center justify-center'>
          <div className='w-full md:w-1/4'>
           <Slider {...settings}>
      {productDetails?.data?.images?.map((src) => {
        return <img className='w-full' src={src} alt={productDetails?.data?.title} />
      })}
    </Slider>

          </div>
          <div className='w-full md:w-2/4 text-start m-5'>
            <h2 className='text-2xl font-bold py-1'>{productDetails?.data?.title}</h2>
            <p className='text-gray-500 py-2'>{productDetails?.data?.description}</p>
            <span className='text-green-600 text-lg'> {productDetails?.data?.category?.name}</span>
             <div className="flex justify-between my-2">
              <span>{productDetails?.data?.price} EGP </span>
              <span> {productDetails?.data?.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
            </div>
            <button className='bg-green-600 w-full text-white py-2 px-4 rounded mt-3'>Add to Cart</button>
          </div>
        </div> : <Spinner />}
     
     <div className='w-full my-10'>
      <h2 className='text-green-500 text-xl font-bold text-center'>Related Products</h2>
      <div className="flex flex-wrap ">
        {relatedProducts?.map((product) => {return   <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
 <div className="product p-5">
           <Link to ={`productdetails/${product.id}/${product.category.name}`}>
            <img src={product.imageCover} alt={product.title} />
            <span className='text-green-600'>{product.category.name}</span>
            <h3 className='text-lg font-bold'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
            <div className="flex justify-between">
              <span>EGP {product.price}</span>
              <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
            </div>
           </Link>
          <button className='w-full bg-green-600 py-2 rounded-md my-2'>Add to Cart</button>

            </div>
        </div>}
            
        )}
      
      </div>
     </div>
    </>
  )
}
