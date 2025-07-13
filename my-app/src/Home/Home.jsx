import React,{ useState, useEffect } from 'react'
import style from'./Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
export default function Home() {

  const [count, setCount] = useState(0)

useEffect(() => {


},[])

  return <>
  <MainSlider/>
    <CategorySlider/>
    <RecentProducts/>
   
    </>
  
}
