import { useEffect } from 'react'
import { AdminOnlyLink } from '../../Components/Admin/AdminOnlyRoute'
import Product from '../../Components/Product/Product'
import Slider from '../../Components/Slider/Slider'
import styles from './Home.module.scss'

const Home = () => {

  const url = window.location.href

  const ScrollProducts = () => {
    if(url.includes("#product")){
      window.scrollTo({
        top:1000,
        behavior:'smooth'
      })
      return
    }
  }

  useEffect(()=>{
    ScrollProducts()
  },[])

  return (
    <div>
      <Slider/>
    <AdminOnlyLink/>
    <Product/>
    </div>
  )
}

export default Home