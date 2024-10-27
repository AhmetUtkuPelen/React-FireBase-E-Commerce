import { useDispatch, useSelector } from 'react-redux'
import styles from './Product.module.scss'
import ProductFilter from './ProductFilter/ProductFilter'
import ProductList from './ProductList/ProductList'
import UseFetchCollection from '../../CustomHooks/UseFetchCollection'
import { GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS } from '../../Redux/Slice/ProductSlice'
import { useEffect, useState } from 'react'
import Spinner from '../../Assets/spinner.jpg'
import { FaCogs } from 'react-icons/fa'




const Product = () => {

  const {data , isLoading} = UseFetchCollection("products")

  const [showFilter , setShowFilter] = useState(false)

  const products = useSelector(selectProducts)

  const dispatch = useDispatch()

  useEffect(()=>{
    
    dispatch(
      STORE_PRODUCTS({
        products:data,
      })
    )

    dispatch(GET_PRICE_RANGE({
      products:data
    }))

  },[dispatch,data])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  return (
    <section>
      <div className={`container ${styles.product}`}>
        
        <aside className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
          {isLoading ? null : <ProductFilter/>}
        </aside>
      
        <div className={styles.content}>
          {isLoading ? <img src={Spinner} className='w-[150px]'/> : (
          <ProductList products={products}/>
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color='blue'/>
            <p className='font-bold'>{showFilter ? "Hide" : "Show"}</p>
          </div>
        </div>
      
      </div>
    </section>
  )
}

export default Product