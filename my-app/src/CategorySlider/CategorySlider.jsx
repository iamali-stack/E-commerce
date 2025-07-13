import React,{ useState, useEffect } from 'react'
import style from'./CategorySlider.module.css'
import axios from 'axios'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [categories, setCategories] = useState(null)

  function getAllCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((data) => {
      console.log("all categories", data?.data);
      setCategories(data?.data);
    }).catch((error) => {
      console.log('error', error);
    });
  }
useEffect(() => {
  getAllCategories();
},[])

  return  <>
    <div className='my-5'>
      <Slider {...settings}>
        {categories?.data.map((category) => (
          <div key={category._id} className="text-center my-2">
            <img className='w-[237.5px] h-[250px]' src={category?.image} alt={category?.name} />
            <h3 className='text-2xl font-semibold'>{category?.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  </>
  
}
