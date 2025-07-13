import React,{ useState, useEffect } from 'react'
import img1 from '../assets/images/slider-image-1.jpg'
import img2 from '../assets/images/slider-image-2.jpg'
import img3 from '../assets/images/slider-image-3.jpg'
import img4 from '../assets/images/grocery-banner.jpg'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  const [count, setCount] = useState(0)

useEffect(() => {


},[])

  return <>
  <div className="flex flex-wrap justify-center my-10">
    <div className="w-1/4 ">
                <Slider {...settings}>
                  <img className='w-full h-[450px]' src={img3} alt="" />
                  <img className='w-full h-[400px]' src={img4} alt="" />
                </Slider>
    
    </div>
    <div className="w-1/4 ">
  <img className='w-full h-[250px]' src={img1} alt="" />
  <img className='w-full h-[250px]' src={img2} alt="" />
    </div>
  </div>
  </>
}
